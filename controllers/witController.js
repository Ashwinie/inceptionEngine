export function compareIntentFromAnswer(witResponse, questionCategory) {
  console.log("witResponse", witResponse);
  console.log("questionCategory", questionCategory);
  //check if intent matches caetgory of question
  if (witResponse.intent.value != questionCategory.toLowerCase()) {
    return false;
  }
  switch (questionCategory.toLowerCase()) {

    case 'attitude':
    case 'availability':
    case 'location':
      checkAssertion(witResponse);
      checkCommunication(witResponse);
      checkNervousness(witResponse);
      break;

    case 'greeting':
      break;
    case 'introduction':
      checkCommunication(witResponse);
      checkNervousness(witResponse);
      break;

    default:
      return true;
      break;

  }
}
export function checkAssertion(witResponse){
let assertionValue=witResponse.enitities.assertion;
console.log("assertionValue",assertionValue);
}
export function checkCommunication(witResponse){

}
export function checkNervousness(witResponse){

}
