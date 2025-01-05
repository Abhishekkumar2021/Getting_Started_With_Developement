export default class Article {
    id: number;
    authorId: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: number,
        authorId: number,
        title: string,
        content: string,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.authorId = authorId;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}