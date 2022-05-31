package YnnitPackage

type Users struct {
	Id       int    `json: "id"`
	Name     string `json: "name"`
	Email    string `json: "email"`
	Password string `json: "password"`
}
type Communauter struct {
	Id         int    `json: "id"`
	Name       string `json: "name"`
	Postinside []Post
}
type Post struct {
	Id            int    `json: "id"`
	Name          string `json: "name"`
	Content       string `json: "email"`
	CommentInside []Comment
}
type Comment struct {
	Id      int    `json: "id"`
	Content string `json: "email"`
}
