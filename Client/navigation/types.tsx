

export type AnswerType = {
  question: string;
  answer: string;
};
export type RootStackParamList = {



  Welcome:undefined;
  Register:undefined;
  Login:undefined;
  OTP:undefined;
  DashBoard:undefined;
  sympCheck:undefined;
  drawer:undefined;
  History:undefined;
  QuestionScreen: {
    symptoms: string[];
    onSubmit: (answers: AnswerType[]) => void;
  };
  BodyPointing:undefined;
 };
