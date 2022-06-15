export default interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  registrationDate: Date;
  userPicture: string;
  password: string;
  idTheme: number;
  idLanguage: number;
  idRight: number;
}
