export default interface IComment {
  id: number;
  text: string;
  report: boolean;
  rating: number;
  idUser: number;
  idArticle: number;
}
