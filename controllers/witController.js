import {
  queryGoogleFit
} from '../server/sevices/googleFit-service';

export function compareIntentFromAnswer(witResponse, questionCategory) {
  console.log("witResponse", witResponse);
  console.log("questionCategory", questionCategory);
  //check if intent matches caetgory of question
  // if (witResponse.intent.value != questionCategory.toLowerCase()) {
  //   return false;
  // }
  switch (witResponse.intent.value.toLowerCase()) {

    case 'attitude':
    case 'availability':
    case 'location':
      checkAssertion(witResponse);
      checkNervousness(witResponse);
      break;

    case 'greeting':
      break;
    case 'introduction':
      checkNervousness(witResponse);
      break;

    default:
      return true;
      break;

  }
}

export function checkAssertion(witResponse) {
  let assertionValue = witResponse.enitities.assertion;
  console.log("assertionValue", assertionValue);
  if (assertionVal == 'positive') {
    console.log("go to next question")
  } else {
    return;
  }
}
export function checkNervousness(witResponse) {
  queryGoogleFit().then((response) => {
    console.log("queryGoogleFit", response);
  });
}
