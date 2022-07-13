export default interface IComment {
  id: number;
  title: string;
  text: string;
  date: Date;
  report: boolean;
  idUser: number;
  idArticle: number;
}
