package YnnitPackage

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

func InitDatabase(database string) *sql.DB {
	db, err := sql.Open("sqlite3", database)
	if err != nil {
		log.Fatal(err)
	}

	sqlStmt := `
		PRAGMA foreign_keys = ON;
		CREATE TABLE IF NOT EXISTS user (
			id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL UNIQUE,
			email TEXT NOT NULL UNIQUE,
			password TEXT NOT NULL
		);
		CREATE TABLE IF NOT EXISTS communauter (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL UNIQUE
		);
		CREATE TABLE IF NOT EXISTS post (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			commulink INTEGER NOT NULL,
			title TEXT NOT NULL,
			contentPost TEXT NOT NULL,
			user_id INTEGET NOT NULL,
			FOREIGN KEY (commulink) REFERENCES communauter(id),
			FOREIGN KEY (user_id) REFERENCES user(id) 
		);
		CREATE TABLE IF NOT EXISTS comment (
			id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			contentComment TEXT NOT NULL,
			userid INTEGET NOT NULL,
			postLink INT,
			FOREIGN KEY (postLink) REFERENCES post(id),
			FOREIGN KEY (userid) REFERENCES user(id) 
		)
		`
	_, err = db.Exec(sqlStmt)
	if err != nil {
		log.Printf("%q: %s\n", err, sqlStmt)
		return nil
	}
	return db
}

func DbtoStructUser(db *sql.DB) []User {
	rowsUsers, _ := db.Query("SELECT * FROM user")
	var temptab []User

	for rowsUsers.Next() {
		var u User
		err := rowsUsers.Scan(&u.Id, &u.Name, &u.Email, &u.Password)
		if err != nil {
			log.Fatal(err)
		}
		temptab = append(temptab, u)
	}
	return temptab
}

func InsertIntoUser(db *sql.DB, name string, email string, password string) bool {
	_, err := db.Exec(`INSERT INTO user (name, email, password) VALUES (?, ?, ?)`, name, email, password)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}

func UpdatePassUser(db *sql.DB, password string, email string) {
	db.Exec(`UPDATE user SET password = ? WHERE email = ?`, password, email)
}

func UpdateMailUser(db *sql.DB, emailnew string, emailact string) {
	db.Exec(`UPDATE user SET email = ? WHERE email = ?`, emailnew, emailact)
}

func UpdateNameUser(db *sql.DB, name string, email string) {
	db.Exec(`UPDATE user SET name = ? WHERE email = ?`, name, email)
}

func DeleteUser(db *sql.DB, email string) {
	db.Exec(`DELETE FROM user WHERE email = ?`, email)
}

func UserExists(db *sql.DB, email string, password string) bool {
	var id int
	var pass string
	sqlStmt := `SELECT id FROM user WHERE email = ?`
	err := db.QueryRow(sqlStmt, email).Scan(&id)
	if err != nil {
		fmt.Println("err", err)
		return false
	} else {
		sqlStmt := `SELECT password FROM user WHERE id = ?`
		err := db.QueryRow(sqlStmt, id).Scan(&pass)
		if err != nil {
			fmt.Println("err", err)
			return false
		} else {
			if password == pass {
				return true
			} else {
				return false
			}
		}
	}
}

func DbtoStructComment(db *sql.DB) []Comment {
	rowsUsers, _ := db.Query("SELECT * FROM comment")
	var temptab []Comment

	for rowsUsers.Next() {
		var u Comment
		err := rowsUsers.Scan(&u.Id, &u.Content, &u.UsersID, &u.PostLink)
		if err != nil {
			log.Fatal(err)
		}
		temptab = append(temptab, u)
	}
	return temptab
}

func InsertIntoComment(db *sql.DB, content string, UserdId int, PostLink int) (int64, error) {
	result, err := db.Exec(`INSERT INTO comment (contentComment, userid, postLink) VALUES (?, ?, ?)`, content, UserdId, PostLink)
	if err != nil {
		log.Fatal(err)
	}
	return result.LastInsertId()
}

func DbtoStructCommunauter(db *sql.DB) []Communauter {
	rowsUsers, _ := db.Query("SELECT * FROM communauter")
	var temptab []Communauter

	for rowsUsers.Next() {
		var u Communauter
		err := rowsUsers.Scan(&u.Id, &u.Name)
		if err != nil {
			log.Fatal(err)
		}
		temptab = append(temptab, u)
	}
	return temptab
}
func InsertIntoCommunauter(db *sql.DB, Name string) (int64, error) {
	result, err := db.Exec(`INSERT INTO communauter (name) VALUES (?)`, Name)
	if err != nil {
		log.Fatal(err)
	}
	return result.LastInsertId()
}
func DbtoStructPost(db *sql.DB) []Post {
	rowsUsers, _ := db.Query("SELECT * FROM post")
	var temptab []Post

	for rowsUsers.Next() {
		var u Post
		err := rowsUsers.Scan(&u.Id, &u.CommuLink, &u.Titlte, &u.Content, &u.UsersID)
		if err != nil {
			log.Fatal(err)
		}
		temptab = append(temptab, u)
	}
	return temptab
}
func InsertIntoPost(db *sql.DB, CommuLink int, Titlte string, Content string, UsersID int) (int64, error) {
	result, err := db.Exec(`INSERT INTO post (commuLink, title, contentPost, user_id) VALUES (?,?,?,?)`, CommuLink, Titlte, Content, UsersID)
	if err != nil {
		log.Fatal(err)
	}
	return result.LastInsertId()
}
