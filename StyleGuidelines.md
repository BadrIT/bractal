# General Style Guidelines :

Since we take our code quality as serious as Functional & UI QA. I would like to introduce the following updates.

Code reviews would be done strictly according to a number of guidelines as detailed below. And yes, we're so opinionated about some of the points below, and most probably won't get so much into discussions about our decisions regarding architecture/design or style.

So, to reduce the Pull Request comments' cycles. Following is what we will use as guideline :

1. Clean Code book (Very simple and quick read)
2. Airbnb style guide (https://github.com/airbnb/javascript). It's an EXTREMELY important read. Although the Eslint tool, will catch all things in the guide, it's super important that you familiarize yourself, with Airbnb reasoning for why you should follow each rule, and different ways to get around each.
3. Our guide below

* All folder names should be camelCase
* All component names should be in PascalCase
* Community isn't on the same page regarding the *.jsx extension. Check the following two links :
  * [Airbnb](https://github.com/airbnb/javascript/pull/985)
  * [Facebook](https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904)
  * We took the side of "No .jsx". Since it absolutely make no difference in our case. PLUS, relay compiler would ignore *.jsx files completely.
* All method definitions inside all Components MUST use the ES6 arrow notation and MUST NOT USE .bind(this)
* Watch out Before submitting a **pull request** :
  * Never submit a pull request, while errors are thrown in browser console.
  * Always, do a pull from the development branch, before submitting the pull request
  * Smoke manual test, since we don't have fully automated tests in place. Test your new code, and any possibly surrounding or related parts of the system, and make sure that the specs of all the related components are fully functional.
* CSS :
  * Use z-index wisely (No 1000s !!)
  * We use Font-awesome for icon sets, try to stick to the free icons from font-awesome
  * For CSS Layout, use the following in order (As appropriate):
    * CSS Grids
    * CoreUI/LayoutHelpers
    * FlexBox as a styled component
  * CSS props order :
    * Major Layout/positioning  :
      * display, Width, height, visibility, position, overflow, z-index, transform, text-align
    * Local positioning :
      * Left, top, bottom, right, margin, padding
    * Flex-X
      * flex-direction, flex-grow.....etc
    * Aesthetics :
      * Color, background color, opacity, font-X
    * Border and border-X
    * Others :
      * Transition, content….etc
* JS/JSX files :
  * To import other files from the same module, always use relative imports
  * To import other files from other modules, it’s recommended to use absolute imports
  * Declare all used State and Props explicit at the beginning of each function in case of long functions (render...etc).
  * Always start paths to assets with “/“ (To avoid issues in places other than the home page)
  * Always make components, a Single Responsibility components
  * Always extract components to higher level or lower level, whenever a components is responsible for more than one thing
  * Make sure that level of granularity inside components is homogeneous.
  * Heavy logic (Other than UI), should be done outside the components itself, mostly in utils
  * For React.Component descendants, avoid using the constructor whenever possible. Instead consider :
    * Defining state directly
    * Using arrow notation instead of binding
    * Init state from props, in ComponentDidMount, ComponentWillMount.
    * In extremely rare cases, you might want to fallback to memorization and similar techniques. (We would only accept this after a very thorough and deep discussion to make sure that you had no other options).
  * Strive for Max 100 lines per file.
  * Never, eslint-disable (Without a very good reason)
  * Whenever you have to eslint-disable, always make this disable for a specific rule. Not for everything.
  * Never submit code with console.log
  * Justify workaround and hacks in comments (Apparently, this should only be done in the very rare cases, you would definitely have hard time convincing us that no other way was possible, with TODO, written on top of it, or reference to the article or URL, that explains why you did it)
  * Imports order at page's top :
    * React
    * 3rd Party
    * ~/modules (Core & Other modules)
    * ~/modules (current module)
    * Relative (Same dir)
  * Never use short or cryptic names
  * Use the following form for Long/Convoluted ternary operations (Specially inside components) :
    ```javascript
        ? (
            <Component1 .....>
        ) : (
            <Component2 .....>
        ) 
    ```
  * Use the following for conditional rendering :
    ```javascript
        { VAL &&
            < …. />
        }
    ```
  * If conditional rendering will result in convoluted code, it MUST be moved a separate function or component. 
  * Enums should be PascalCase, and their values, should be UPPER_CASE
  * Leave empty line before major constructs (if, for, map...etc)
Avoid nesting conditional rendering
* General Coding guidelines :
  * Naming of concepts in the code, should follow exactly the namings used in the UI.
  * If a hack/workaround/special-handling is needed. (Like calling document.getElementByName, Class or ID), then first it must be absolutely necessary, second it must be wrapped in a separate component/utility.
  * No hard coded values, no magic numbers, no literal values
    * Prefer named constants and configuration
  * Code is readable:
    * Code is self-commenting
    * Enough logic comments
    * Formal documentation for methods and classes
  * Stick to minimal code scope visibility
  * No unused code
  * No debugger (Hadeer)
  * No commented code
  * If the change is refactoring, make sure inputs, outputs and general behavior did NOT changed
  * If the change set allocates expensive resources, they should be released
  * Can the change be achieved using existing code, or bits and pieces from the framework?
  * Should the input be validated, or guarded against undesired values?
    * E.g., does the code guard against a 'null' value
  * Should the change reflect in a README or a CHANGE_LOG?

# Pull request pre-routine :
  * Entry criteria
    * Merge request has no conflicts (With development branch)  
    * Change set is relatively small (max 400 LOC) (1 task per pull request)
    * Change set corresponds to ONLY one task
    * If the change is anything more than a handful number of changed lines, then smoke test defined later in this page is mandatory
  * Logistics
    * Branch name follows this pattern (can be forced through a git hook):
      * feature/KEY-ID-small-case-description, or
      * bug/KEY-ID-small-case-description, or
      * hotfix/KEY-ID-small-case-description, or
      * refactor/KEY-ID-small-case-description, or
      * spike/KEY-ID-small-case-description
  * Commit messages are:
    * Descriptive
    * Contains references to the issue (can be forced through a git hook)
    * Single commit achieves one purpose


Always do a smoke test on most project tabs, before submitting a pull request
Always, close the app, and refetch, compile relay, then start testing, before submitting a pull request
Get rid off semantic ui, in all views (Except in the CoreUI)
Whenever a component could be generic. Write it generic, with Countries dropdown as an example (Unless agreed upon avoiding that explicitly with Team Lead)
