interface Source {
  id?: string;
  name: string;
}

export interface Article {
  author: string;
  content: string;
  description: string;
  title: string;
  url: string;
  urlToImage: string;
  source: Source;
}
