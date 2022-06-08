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
	Id         int    `json: "id"`
	Name       string `json: "name"`
	Email      string `json: "email"`
	desc       string `json: "desc"`
	pp         string `json: "pp"`
	Password   string `json: "password"`
	UsersLevel string `json: "usersLevel"`
}
type Communauter struct {
	Id   int    `json: "id"`
	desc string `json: "desc"`
	Name string `json: "name"`
}
type Post struct {
	Id        int    `json: "id"`
	CommuLink int    `json: "commuLink"`
	Title     string `json: "title"`
	Content   string `json: "content"`
	UsersName string `json: "NameUser"`
	Like      int    `json: "likeCount"`
}
type Comment struct {
	Id        int    `json: "id"`
	Content   string `json: "content"`
	PostLink  int    `json: "postLink"`
	UsersName string `json: "NameUser"`
	Like      int    `json: "likeCount"`
}
