export default interface IArticle {
  id: number;
  title: string;
  idUser: number;
  mainImage: string;
  mainContent: string;
  creationDate: Date;
  lastUpdateDate: Date;
}
