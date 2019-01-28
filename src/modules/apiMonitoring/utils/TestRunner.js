/* eslint-disable no-restricted-globals */
import moment from 'moment';

const endPoint = 'https://ayk-test-portal.badrit.com/graphiql';

const globalAdditionalHeaders = {};

export const StepStatus = {
  IN_PROGRESS: 0,
  SUCCEEDED: 1,
  FAILED: 2,
  NORMAL: 3,
};

export const getTestSuitePath = suiteName =>
  `${suiteName}`;

export const getTestPath = (suiteName, testName) =>
  `${suiteName}->${testName}`;

export const getStepPath = (suiteName, testName, stepName) =>
  `${suiteName}->${testName}->${stepName}`;

const sendRequest = test => fetch(endPoint, {
  method: 'POST',
  headers: {
    ...globalAdditionalHeaders,
    ...test.additionalHeaders,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: test.construct.operation,
    variables: {
      ...test.construct.defaultVariables,
      ...test.variables,
    },
  }),
}).then((response) => {
  if (response.ok) {
    return response.json();
  }
  throw response;
}).catch((err) => {
  throw err;
});

const getField = (obj, fieldChain) => {
  const fieldsChain = fieldChain.split('.');
  let current = obj.data;
  let currentChain = 'data';
  fieldsChain.forEach((field) => {
    currentChain = `${currentChain}.${field}`;
    if (!current[field]) {
      throw new Error(`ASSERTION FAILED : '${currentChain}', is required but not found, in the object ${JSON.stringify(obj, null, 4)}`);
    } else {
      current = current[field];
    }
  });
  return current;
};

const validatePostAssertions = (test, response) =>
  test.postAssertions && test.postAssertions.forEach((assertion) => {
    if (assertion.assert === 'fieldsExist') {
      assertion.params.forEach((param) => {
        getField(response, param);
      });
    } else if (assertion.assert === 'timestampRange') {
      const fieldValue = getField(response, assertion.timestampField);

      const now = moment();
      const fieldAsMoment = moment.unix(parseInt(fieldValue, 10));
      const diff = moment.duration(fieldAsMoment.diff(now));
      let checkedValue = 0;
      if (assertion.check === 'hours') {
        checkedValue = parseInt(diff.asHours(), 10);
      }
      const { range } = assertion;
      let isValid = !isNaN(checkedValue);
      let subErrorMessage = '';

      if (isValid && range.equal) {
        if (!(checkedValue === range.equal)) {
          isValid = false;
          subErrorMessage = `should be equal to ${range.equal},`;
        }
      }
      if (isValid && range.from) {
        if (!(checkedValue >= range.from)) {
          isValid = false;
          subErrorMessage = `should be more than ${range.from},`;
        }
      }
      if (isValid && range.to) {
        if (!(checkedValue <= range.to)) {
          isValid = false;
          subErrorMessage = `should be less than ${range.to},`;
        }
      }

      if (!isValid) {
        throw new Error(`ASSERTION FAILED : Validity of token ${subErrorMessage} ${assertion.check}, now it's ${checkedValue}`);
      }
    } else if (assertion.assert === 'custom') {
      assertion.func(response.data);
    }
  });

const execute = test => sendRequest(test)
  .then((response) => {
    validatePostAssertions(test, response);
    return response;
  })
  .catch((err) => {
    throw err;
  });

const recursiveFindErrors = (obj) => {
  if (obj && typeof (obj) === 'object') {
    if (obj.errors && obj.errors.length > 0) {
      throw JSON.stringify(obj.errors, null, 4);
    } else if (obj.error) {
      throw JSON.stringify(obj.error, null, 4);
    }

    Object.keys(obj).forEach((field) => {
      const res = recursiveFindErrors(obj[field]);
      if (res || res !== '"null"') {
        throw (res);
      }
    });
  }
  return null;
};

const findErrors = (obj) => {
  try {
    recursiveFindErrors(obj);
  } catch (err) {
    return err;
  }
  return null;
};

export default (testSuites, onStatusUpdate, onTestSucceded, onTestFailed) => {
  testSuites.forEach((testSuite) => {
    const initial = new Promise(resolveInitial => resolveInitial('Started'));

    testSuite.tests.forEach((test) => {
      const callChain = test.steps.reduce(
        (prev, step) => prev.then(() => {
          const runInfo = {
            type: 'stepRunInfo',
            path: getStepPath(testSuite.name, test.name, step.name),
            testSuiteName: testSuite.name,
            testName: test.name,
            stepName: step.name,
            startTime: Date.now(),
            status: StepStatus.IN_PROGRESS,
          };

          onStatusUpdate(runInfo);

          return execute(step)
            .then((res) => {
              const error = findErrors(res);
              if (step.isErrorExpected) {
                if (!error) {
                  throw new Error('And error is expected, but none, was found');
                }
              } else if (error) {
                throw error;
              }
              runInfo.result = res;
              runInfo.status = StepStatus.SUCCEEDED;
              onStatusUpdate(runInfo);
              return runInfo; // TODO : not used for now
            })
            .catch((err) => {
              console.log(err);
              runInfo.error = err && (err.message || err);
              runInfo.status = StepStatus.FAILED;
              onStatusUpdate(runInfo);
              throw runInfo;
            });
        }),
        initial,
      );

      callChain
        .then(() => {
          onTestSucceded(test.name);
        })
        .catch((failedStepInfo) => {
          onTestFailed(failedStepInfo);
        });
    });
  });
};
