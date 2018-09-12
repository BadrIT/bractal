/* eslint-disable react/no-danger, max-len */

import React from 'react';
import styled from 'styled-components';
import { translate } from 'react-i18next';
import { Container } from 'semantic-ui-react';

import TestRunner, { StepStatus, getTestSuitePath, getTestPath, getStepPath } from '~/modules/apiMonitoring/utils/TestRunner';
import createTests from '~/modules/apiMonitoring/utils/createAccountMgmtApiTests';
import Button from '~/modules/coreUI/components/basic/Button';

import Spacer from '~/modules/coreUI/components/layouts/helpers/Spacer';
import { MediumLabel, Header } from '~/modules/coreUI/components/basic/Labels';
import { Row, Column } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';

import ToggleCard from '~/modules/apiMonitoring/components/ToggleCard';

import GraphQlConstructs from '../utils/GraphqlConstructs';

const BoxedContent = styled.div`
  word-wrap: break-word;
  border: solid 1px ${props => props.theme.borders.color.normal};
  padding: ${props => props.theme.paddings.medium}px;
`;

const SubcontentCard = styled(ToggleCard)`
  width: 100%;
`;

class HomePage extends React.Component {
  state = {
    testStuies: createTests().testSuites,
    statuses: {},
    failed: false,
    stepsResults: {},
  }

  onStatusUpdate = (stepInfo) => {
    const { testSuiteName, testName, stepName } = stepInfo;
    const suitePath = getTestSuitePath(testSuiteName);
    const testPath = getTestPath(testSuiteName, testName);
    const stepPath = getStepPath(testSuiteName, testName, stepName);

    this.setState({
      stepsResults: {
        ...this.state.stepsResults,
        [stepPath]: stepInfo,
      },
      statuses: {
        ...this.state.statuses,
        [suitePath]: stepInfo.status,
        [testPath]: stepInfo.status,
        [stepPath]: stepInfo.status,
      },
    });
  }

  onTestSucceded = () => {
    this.setState({
      failed: false,
    });
  }
  onTestFailed = (error) => {
    this.setState({
      failed: true,
    });

    if (error && error.type === 'stepRunInfo') {
      this.onStatusUpdate(error);
    }
  }
  getTestSuiteStatus = testSuiteName =>
    this.state.statuses[getTestSuitePath(testSuiteName)] || StepStatus.NORMAL;

  getTestStatus = (testSuiteName, testName) =>
    this.state.statuses[getTestPath(testSuiteName, testName)] || StepStatus.NORMAL;

  getStepStatus = (testSuiteName, testName, stepName) =>
    this.state.statuses[getStepPath(testSuiteName, testName, stepName)] || StepStatus.NORMAL;

  startTest = () => {
    const newTestSuites = createTests().testSuites;
    this.setState({
      testStuies: newTestSuites,
    });
    TestRunner(newTestSuites, this.onStatusUpdate, this.onTestSucceded, this.onTestFailed);
  }

  // TODO : It returns a malformed string. Needs better handling
  /*
  if (typeof value === 'function') {
    return value.toString();
  }
  */
  stringifyFunction = (key, value) => value;

  stringJsonToFormattedHTML = (text) => {
    if (typeof (text) === 'object') {
      return JSON.stringify(text, this.stringifyFunction, 4).replace(/\n/g, '<br/>').replace(/\\n/g, '<br/>').replace(/[ ]/g, '&nbsp;');
    } else if (text) {
      return text.replace(/\n/g, '<br/>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/[ ]/g, '&nbsp;');
    }

    return '';
  }

  render = () => (
    <React.Fragment>
      <Container>
        <Spacer />

        <Column fullWidth stretchAligned>
          <Header color={this.state.failed ? 'red' : 'black'} >
            GraphQL Constructs :
          </Header>
          <Spacer />
          {Object.keys(GraphQlConstructs).map((constructKey) => {
            const construct = GraphQlConstructs[constructKey];
            return (
              <React.Fragment key={construct.displayName}>
                <Spacer />
                <ToggleCard
                  title={construct.displayName}
                >
                  <React.Fragment>
                    <SubcontentCard
                      showBorder={false}
                      title="Construct : "
                    >
                      <BoxedContent dangerouslySetInnerHTML={{ __html: this.stringJsonToFormattedHTML(construct.operation) }} />
                    </SubcontentCard>
                    <SubcontentCard
                      showBorder={false}
                      title="Default Variables : "
                    >
                      <BoxedContent dangerouslySetInnerHTML={{ __html: this.stringJsonToFormattedHTML(construct.defaultVariables) }} />
                    </SubcontentCard>
                  </React.Fragment>
                </ToggleCard>
              </React.Fragment>
            );
          })}
        </Column>

        <Spacer />

        <Row leftJustified>
          <Header color={this.state.failed ? 'red' : 'black'} >
            Test Suites
          </Header>
          <Spacer />
          <Button width="100px" primary onClicked={() => this.startTest()}>
            RUN
          </Button>
        </Row>

        <Spacer />

        {this.state.testStuies.map((testSuite) => {
          const suiteCardStatus = this.getTestSuiteStatus(testSuite.name);

          return (
            <React.Fragment key={testSuite.name}>
              <Spacer />
              <ToggleCard
                title={testSuite.name}
                titleSize="large"
                mode={suiteCardStatus}
              >
                <React.Fragment>
                  <MediumLabel color="important">
                    <b>Tests :</b>
                  </MediumLabel>
                  { testSuite.tests.map((test) => {
                      const testCardStatus = this.getTestStatus(testSuite.name, test.name);
                      return (
                        <React.Fragment key={`${testSuite.name}-${test.name}`}>
                          <Spacer />
                          <Row fullWidth stretchJustified>
                            <Spacer />
                            <ToggleCard
                              title={test.name}
                              mode={testCardStatus}
                            >
                              <React.Fragment>
                                { test.steps.map((step) => {
                                  const stepStatus =
                                    this.getStepStatus(testSuite.name, test.name, step.name);
                                  const stepInfo = this.state.stepsResults[
                                    getStepPath(testSuite.name, test.name, step.name)];

                                  const error = stepInfo
                                    && stepInfo.error
                                    && this.stringJsonToFormattedHTML(stepInfo.error);

                                  const result = stepInfo
                                    && stepInfo.result
                                    && this.stringJsonToFormattedHTML(stepInfo.result);

                                  return (
                                    <React.Fragment key={`${testSuite.name}-${test.name}-${step.name}`}>
                                      <MediumLabel color="important">
                                        <b>Steps :</b>
                                      </MediumLabel>
                                      <Spacer />
                                      <Row fullWidth stretchJustified>
                                        <Spacer />
                                        <ToggleCard
                                          title={step.name}
                                          mode={stepStatus}
                                        >
                                          <Row topAligned fullWidth stretchJustified>
                                            <Column leftAligned width="50%">
                                              {result && (
                                                <SubcontentCard
                                                  colorizeTitle
                                                  mode={StepStatus.SUCCEEDED}
                                                  showBorder={false}
                                                  title="Response :"
                                                >
                                                  <BoxedContent dangerouslySetInnerHTML={{ __html: result }} />
                                                </SubcontentCard>
                                              )}
                                              {error && (
                                                <SubcontentCard
                                                  colorizeTitle
                                                  mode={StepStatus.FAILED}
                                                  showBorder={false}
                                                  title="Error :"
                                                >
                                                  <BoxedContent dangerouslySetInnerHTML={{ __html: error }} />
                                                </SubcontentCard>
                                              )}
                                            </Column>
                                            <Column leftAligned fullWidth width="50%">
                                              {step.construct.operation && (
                                                <SubcontentCard
                                                  showBorder={false}
                                                  title="Operation :"
                                                >
                                                  <BoxedContent dangerouslySetInnerHTML={{ __html: this.stringJsonToFormattedHTML(step.construct.operation) }} />
                                                </SubcontentCard>
                                              )}
                                              {step.construct.defaultVariables && (
                                                <SubcontentCard
                                                  showBorder={false}
                                                  title="Default Variables : "
                                                >
                                                  <BoxedContent dangerouslySetInnerHTML={{ __html: this.stringJsonToFormattedHTML(step.construct.defaultVariables) }} />
                                                </SubcontentCard>
                                              )}
                                              {step.variables && (
                                                <SubcontentCard
                                                  showBorder={false}
                                                  title="Variables : "
                                                >
                                                  <BoxedContent dangerouslySetInnerHTML={{ __html: this.stringJsonToFormattedHTML(step.variables) }} />
                                                </SubcontentCard>
                                              )}
                                              {step.postAssertions && (
                                                <SubcontentCard
                                                  showBorder={false}
                                                  title="Post Assertions : "
                                                >
                                                  <BoxedContent dangerouslySetInnerHTML={{ __html: this.stringJsonToFormattedHTML(step.postAssertions) }} />
                                                </SubcontentCard>
                                              )}
                                            </Column>
                                          </Row>
                                        </ToggleCard>
                                      </Row>
                                    </React.Fragment>
                                  );
                                })}
                              </React.Fragment>
                            </ToggleCard>
                          </Row>
                        </React.Fragment>
                      );
                    })}
                </React.Fragment>
              </ToggleCard>
            </React.Fragment>
          );
        })}
        <Spacer />
      </Container>
    </React.Fragment>
  );
}

export default translate('apiMonitoring')(HomePage);
