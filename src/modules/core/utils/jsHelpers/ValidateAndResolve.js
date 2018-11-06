/* eslint-disable camelcase, no-else-return */

/*

example 1 :
  ValidateAndResolve
    .with(itemInfo)
      .if_hasAnyOf(['verticalSeparator', 'horizontalSpacer'])
        .thenProhibitAllOf([
          'linkLabelText', 'iconImageSrc', 'itemRenderer', 'targeturl', 'dropdownContent',
        ])
      .and_if_hasAnyOf(['linkLabelText', 'iconImageSrc', 'itemRenderer'])
        .thenRequireAnyOf([
          'targeturl', 'dropdownContent',
        ])
    .then()
      .if_has('verticalSeparator')
        .resolveWith(renderVerticalSeparator(itemInfo))

      .else_if_has('horizontalSpacer')
        .resolveWith(renderHorizontalSpacer(itemInfo))

      .else()
        .resolveWith(renderMenuItem(itemInfo))

      .end();

*/

const arrayToString = array => array.map(e => e.toString()).join(', ');

const IF_CONDITIONS = Object.freeze({
  HAS_ANY_OF: 1,
  HAS: 2,
});

export default class Validation {
  targetObject = null;
  propsToSearchFor = null;

  preConditionsStarted = false;
  preConditionsEnded = false;
  preConditionsSatisfied = true;

  postConditionsStarted = false;
  postConditionsSatisfied = false;

  acceptedResolution = null;

  static with = targetObject => new Validation(targetObject);

  constructor(targetObject) {
    this.targetObject = targetObject;
  }

  targetObjectKeys = () => Object.keys(this.targetObject);

  thenRequireAnyOf = (requiredProps) => {
    if (!this.preConditionSatisfied) return this;

    const requiredPropsExists =
      requiredProps.some(property => this.targetObjectKeys().includes(property));

    const propsToSearchForString = arrayToString(this.propsToSearchFor);
    const requiredPropsString = arrayToString(requiredProps);

    if (!requiredPropsExists) {
      throw new Error(`If any of : [${propsToSearchForString}] exists, then you should provide any of : [${requiredPropsString}]`);
    }

    return this;
  }

  thenRequireOneOf = (requiredProps) => {
    if (!this.preConditionSatisfied) return this;

    const requiredPropsFound =
      requiredProps.filter(property => this.targetObjectKeys().includes(property));

    const propsToSearchForString = arrayToString(this.propsToSearchFor);
    const requiredPropsString = arrayToString(requiredProps);
    const requiredPropsFoundString = arrayToString(requiredPropsFound);

    if (!requiredPropsFound.length === 1) {
      throw new Error(`If any of : [${propsToSearchForString}] exists, then you should provide one (and only ONE) of : [${requiredPropsString}], but you provided : [${requiredPropsFoundString}]`);
    }

    return this;
  }

  thenProhibitAllOf = (prohibitedProbs) => {
    if (!this.preConditionSatisfied) return this;

    const prohibitedPropertyExists =
      prohibitedProbs.some(property => this.targetObjectKeys().includes(property));

    const propsToSearchForString = arrayToString(this.propsToSearchFor);
    const prohibitedPropsString = arrayToString(prohibitedProbs);

    if (prohibitedPropertyExists) {
      throw new Error(`If any of : [${propsToSearchForString}] exists, we shouldn't see any of : [${prohibitedPropsString}]`);
    }

    return this;
  }

  andProhibitAllOf = prohibitedProbs => this.thenProhibitAllOf(prohibitedProbs);

  then = () => {
    this.preConditionsEnded = true;
    return this;
  }

  hasAnyOf = (propsToSearchFor) => {
    this.propsToSearchFor = propsToSearchFor;
    this.preConditionSatisfied =
      propsToSearchFor.some(property => this.targetObjectKeys().includes(property));

    return this;
  }
  has = property => this.targetObjectKeys().includes(property);

  applyPredicate = (predicate, param) => {
    let predicateMethod = null;

    switch (predicate) {
      case IF_CONDITIONS.HAS_ANY_OF:
        predicateMethod = this.hasAnyOf;
        break;
      case IF_CONDITIONS.HAS:
        predicateMethod = this.has;
        break;
      default:
        throw new Error(`Invalid operation : ${predicate}`);
    }

    return predicateMethod(param);
  }

  apply_if = (predicate, param) => {
    if (!this.preConditionsEnded) {
      this.preConditionsSatisfied = this.applyPredicate(predicate, param);
    } else if (this.preConditionsEnded && !this.postConditionsStarted && !this.acceptedResolution) {
      this.postConditionsStarted = true;
      this.postConditionsSatisfied = this.applyPredicate(predicate, param);
    } else {
      throw new Error("Unexpected 'if' encountered. Potentially after a previous 'if' or 'if_else', or after a resolution was already accepted");
    }

    return this;
  }

  if_has = property => this.apply_if(IF_CONDITIONS.HAS, property);
  if_hasAnyOf = properties => this.apply_if(IF_CONDITIONS.HAS_ANY_OF, properties);

  and_if_hasAnyOf = (properties) => {
    if (this.preConditionsEnded) {
      throw new Error("'and_if_hasAnyOf', is supported only inside a pre-conditions block");
    }

    return this.apply_if(IF_CONDITIONS.HAS_ANY_OF, properties);
  }

  apply_elseIf = (predicate, param) => {
    if (!this.postConditionsStarted) {
      throw new Error("'else_id', not expected to be applied before 'if', and not supported in the pre conditions");
    } else if (this.postConditionsStarted && !this.solutionAccepted) {
      this.postConditionsSatisfied = this.applyPredicate(predicate, param);
    }

    return this;
  }

  else_if_has = property => this.apply_elseIf(IF_CONDITIONS.HAS, property);
  else_if_hasAnyOf = properties => this.apply_elseIf(IF_CONDITIONS.HAS_ANY_OF, properties);


  else = () => {
    if (!this.postConditionsStarted) {
      throw new Error('Else, is supported only inside a post-conditions block');
    }

    this.postConditionsSatisfied = true;

    return this;
  }

  resolveWith = (resolution) => {
    if (this.acceptedResolution) {
      return this;
    }

    if (!this.postConditionsStarted
        || this.postConditionsSatisfied) {
      this.acceptedResolution = resolution;
    }

    return this;
  }

  end = () => this.acceptedResolution;
}
