package YnnitPackage

import "database/sql"

type AllStructs struct {
	db              *sql.DB
	UsersAll        []User
	CommunautersAll []Communauter
	PostsAll        []Post
	CommentsAll     []Comment
}

type User struct {
	Id       int    `json: "id"`
	Name     string `json: "name"`
	Email    string `json: "email"`
	Password string `json: "password"`
}
type Communauter struct {
	Id   int    `json: "id"`
	Name string `json: "name"`
}
type Post struct {
	Id        int    `json: "id"`
	CommuLink int    `json: "commuLink"`
	Title     string `json: "title"`
	Content   string `json: "content"`
	UsersID   int    `json: "idUser"`
	Like      int    `json: "likeCount"`
}
type Comment struct {
	Id       int    `json: "id"`
	Content  string `json: "email"`
	PostLink int    `json: "postLink"`
	UsersID  int    `json: "idUser"`
	Like     int    `json: "likeCount"`
}
