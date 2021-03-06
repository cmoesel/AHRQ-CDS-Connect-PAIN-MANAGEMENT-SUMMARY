# Pain Management Summary SMART on FHIR Application

## About

The Pain Management Summary SMART on FHIR application was developed to support the pilot of the CDS artifact, “Factors to Consider in Managing Chronic Pain: A Pain Management Summary.”  This artifact presents a variety of key "factors" for clinicians to consider when assessing the history of a patient's chronic pain.  These factors include subjective and objective findings, along with recorded treatments and interventions to inform shared decision making on treatments moving forward.

The Pain Management Summary SMART on FHIR application was piloted during Summer 2018.  Local modifications and development were needed to fully support this application in the pilot environment.  For example, custom development was needed to expose pain assessments via the FHIR API. See the pilot reports for more information.

This prototype application is part of the [CDS Connect](https://cds.ahrq.gov/cdsconnect) project, sponsored by the [Agency for Healthcare Research and Quality](https://www.ahrq.gov/) (AHRQ), and developed under contract with AHRQ by [MITRE's CAMH](https://www.mitre.org/centers/cms-alliances-to-modernize-healthcare/who-we-are) FFRDC.

## Contributions

For information about contributing to this project, please see [CONTRIBUTING](CONTRIBUTING.md).

## Development Details

The Pain Management Summary is a web-based application implemented with the popular [React](https://reactjs.org/) JavaScript framework. The application adheres to the [SMART on FHIR](https://smarthealthit.org/) standard, allowing it to be integrated into EHR products that support the SMART on FHIR platform. To ensure the best adherence to the standard, the Pain Management Summary application uses the open source [FHIR client](https://github.com/smart-on-fhir/client-js) library provided by the SMART Health IT group.

The logic used to determine what data to display in the Pain Management Summary is defined using [CQL](http://cql.hl7.org/) and integrated into the application as the corresponding JSON ELM representation of the CQL.  The application analyzes the JSON ELM representation to determine what data is needed and then makes the corresponding queries to the FHIR server.

Once the necessary FHIR data has been retrieved from the EHR, the open source [CQL execution engine](https://github.com/cqframework/cql-execution) library is invoked with it and the JSON ELM to calculate the structured summary of the data to display to the user.  This structured summary is then used by the React components to render a user-friendly view of the information.

### To build and run in development:

1. Install [Node.js](https://nodejs.org/en/download/) (LTS edition, currently 8.x)
2. Install [Yarn](https://yarnpkg.com/en/docs/install) (1.3.x or above)
3. Install dependencies by executing `yarn` from the project's root directory
4. If you have a SMART-on-FHIR client ID, edit `public/launch-context.json` to specify it
5. If you'll be launching the app from an Epic EHR, modify `.env` to set `REACT_APP_EPIC_SUPPORTED_QUERIES` to `true`
6. Serve the code by executing `yarn start` (runs on port 8000)

## To build and deploy using a standard web server (static HTML and JS)

The Pain Management Summary can be deployed as static web resources on any HTTP server.  There are several customizations, however, that need to be made based on the site where it is deployed.

1. Install [Node.js](https://nodejs.org/en/download/) (LTS edition, currently 8.x)
2. Install [Yarn](https://yarnpkg.com/en/docs/install) (1.3.x or above)
3. Install dependencies by executing `yarn` from the project's root directory
4. Modify the `homepage` value in `package.json` to reflect the path (after the hostname) at which it will be deployed
   a. For example, if deploying to https://my-server/pain-mgmt-summary/, the `homepage` value should be `"http://localhost:8000/pain-mgmt-summary"` (note that the hostname need not match)
   b. If deploying to the root of the domain, you can leave `homepage` as `"."`
5. Modify the `client_id` in `public/launch-context.json` to match the unique client ID you registered with the EHR from which this app will be launched
6. If you've set up an analytics endpoint (see below), set the `analytics_endpoint` and `x_api_key` in `public/config.json`
7. If you'll be launching the app from an Epic EHR, modify `.env` to set `REACT_APP_EPIC_SUPPORTED_QUERIES` to `true`
   a. This modifies some queries based on Epic-specific requirements
8. Run `yarn build` to compile the code to static files in the `build` folder
9. Deploy the output from the `build` folder to a standard web server

Optionally to step 9, you can run the static build contents in a simple Node http-server via the command: `yarn start-static`.

### To run the unit tests

To execute the unit tests:

1. Run `yarn test`

## To test the app using the public SMART sandbox

Run the app via one of the options above, then:

1. Browse to http://launch.smarthealthit.org/
2. In the _App Launch URL_ box at the bottom of the page, enter: `http://localhost:8000/launch.html`
3. Click _Launch App!_
4. Select a patient

### To upload test patients to the public SMART sandbox

Testing this SMART App is more meaningful when we can supply test patients that exercise various aspects of the application.  Test patients are represented as FHIR bundles at `src/utils/test_patients`.  To upload the test patients to the public SMART sandbox:

1. Run `yarn upload-test-patients`

This adds a number of patients, mostly with the last name "Jackson" (for example, "Fuller Jackson" has entries in every section of the app).  The SMART sandbox may be reset at any time, so you may need to run this command again if the database has been reset.

### To test the app in standalone mode using the public SMART sandbox

The SMART launcher has a bug that doesn't allow IE 11 to enter the launch URL.  This makes testing in IE 11 very difficult.  To overcome this, you can reconfigure the app as a standalone app.  To do so, follow these steps:

1. Overwrite the `/public/launch-context.json` file with these contents:
   ```json
   {
     "client": {
       "client_id": "6c12dff4-24e7-4475-a742-b08972c4ea27",
       "scope":  "patient/*.read launch/patient"
     },
     "server": "url-goes-here"
   }
   ```
2. Restart the application server
3. Browse to http://launch.smarthealthit.org/
4. In _Launch Type_, choose **Provider Standalone Launch**
5. Copy the FHIR URL in the _FHIR Server URL_ box (e.g., `http://launch.smarthealthit.org/v/r2/sim/eyJoIjoiMSIsImkiOiIxIiwiaiI6IjEifQ/fhir`)
6. Paste it into `/public/launch-context.json` file where `url-goes-here` is
7. Browse to http://localhost:8000/launch.html

_NOTE: Do *not* check in the modified launch-context.json!_

## To test the app using a local instance of the SMART Platform

First install the SMART Platform via: https://github.com/smart-on-fhir/installer

Verify it works via the sample apps included with it:
1. Browse to http://localhost:9080/
2. Sign in using demo/demo
3. Pick "SMART DSTU2 Sandbox"
4. Click "Growth Chart" app
5. Click "Launch"
6. Click "Clark, Susan A."

Then run the app via one of the options above and register it via the SMART Platform:

1. Browse to http://localhost:9080/ (if not already signed in)
2. Sign in using demo/demo (if not already signed in)
3. Pick "SMART DSTU2 Sandbox" (if not already signed in)
4. Choose "Register Manually"
5. Enter these values:
   a. App Type: Public Client
   b. App Name: CQL Demo
   c. App Launch URI: http://localhost:8000/launch.html
   d. App Redirect URIs: http://localhost:8000/
   e. Allow Offline Access: NO
   f. Patient Scoped App: YES
6. Save
7. Click the "CQL Demo" app
8. Click "Launch"
9. Choose a patient

## To test the app using the Epic SMART sandbox

The public Epic sandbox does not provide any synthetic patients that exercise the Pain Management Summary logic very well.  For this reason, testing against the public Epic sandbox is generally only useful to prove basic connection capability.

Run the app via one of the options above, then:

1. Browse to https://open.epic.com/Launchpad/Oauth2Sso
2. Select a patient from the dropdown
3. In the _YOUR APP'S LAUNCH URL_ box, enter: `http://localhost:8000/launch.html`
4. In the _YOUR APP'S OAUTH2 REDIRECT URL_ box, enter: `http://localhost:8000/`
5. Click _Launch App_

## Advanced: To post application analytics

This app can post JSON-formatted analytic data to an endpoint each time the application is invoked.

The data that is posted reports whether or not the patient met the CDS inclusion criteria, lists each section and subsection of the summary (along with the number of entries in each subsection), and provides an overall count of entries.  The basic form of the data is as follows:

```
{
  "meetsInclusionCriteria": <boolean>,
  "sections": [
    {
      "section": <stringName>,
      "subSections": [
        { "subSection": <stringName>, "numEntries": <intCount> },
        ...
      ]
    },
    ...
  ],
  "totalNumEntries": <intCount>
}
```

To enable posting of analytics, configure the `analytics_endpoint` and `x_api_key` in the `public/config.json` file. The default value is an empty string, which will not post any analytics.
