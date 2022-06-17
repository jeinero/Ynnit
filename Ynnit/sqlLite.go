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
			desc TEXT NOT NULL,
			levelUser TEXT NOT NULL,
			date TEXT NOT NULL,		
			password TEXT NOT NULL
		);
		CREATE TABLE IF NOT EXISTS communauter (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL UNIQUE,
			desc TEXT NOT NULL,
			date TEXT NOT NULL
		);
		CREATE TABLE IF NOT EXISTS post (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			date INTEGER NOT NULL,
			commulink INTEGER NOT NULL,
			title TEXT NOT NULL,
			contentPost TEXT NOT NULL,
			username TEXT NOT NULL,
			FOREIGN KEY (commulink) REFERENCES communauter(id),
			FOREIGN KEY (username) REFERENCES user(name) 
		);
		CREATE TABLE IF NOT EXISTS comment (
			id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			contentComment TEXT NOT NULL,
			username TEXT NOT NULL,
			date INTEGER NOT NULL,
			postLink INT,
			FOREIGN KEY (postLink) REFERENCES post(id),
			FOREIGN KEY (username) REFERENCES user(name) 
		);
		CREATE TABLE IF NOT EXISTS likedpost (
			id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			postLike INTEGER NOT NULL,
			userid INTEGER NOT NULL,
			FOREIGN KEY (postLike) REFERENCES post(id),
			FOREIGN KEY (userid) REFERENCES user(id) 
		);
		CREATE TABLE IF NOT EXISTS likedcomment (
			id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			commentLike INTEGER NOT NULL,
			userid INTEGER NOT NULL,
			FOREIGN KEY (commentLike) REFERENCES comment(id),
			FOREIGN KEY (userid) REFERENCES user(id) 
		);
		CREATE TABLE IF NOT EXISTS categorie (
			id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			name INTEGER NOT NULL
		);
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
		err := rowsUsers.Scan(&u.Id, &u.Name, &u.Email, &u.Desc, &u.UsersLevel, &u.Date, &u.Password)
		if err != nil {
			fmt.Println(err)
		}
		temptab = append(temptab, u)
	}
	return temptab
}

func InsertIntoUser(db *sql.DB, name string, email string, password string, desc string, levelUser string, date string) bool {
	_, err := db.Exec(`INSERT INTO user (name, email, password, desc, levelUser, date) VALUES (?, ?, ?, ?, ?, ?)`, name, email, password, desc, levelUser, date)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}

func UpdatePassUser(db *sql.DB, id int, password string) bool {
	_, err := db.Exec(`UPDATE user SET password = ? WHERE id = ?`, password, id)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}

func UpdateMailUser(db *sql.DB, id int, emailnew string) bool {
	_, err := db.Exec(`UPDATE user SET email = ? WHERE id = ?`, emailnew, id)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}

func UpdateDescUser(db *sql.DB, id int, descnew string) bool {
	_, err := db.Exec(`UPDATE user SET desc = ? WHERE id = ?`, descnew, id)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}

// func UpdateNameUser(db *sql.DB, id int, name string) bool {
// 	_, err := db.Exec(`UPDATE user SET name = '?' WHERE id = ?`, name, id)
// 	if err != nil {
// 		fmt.Println(err)
// 		return false
// 	}
// 	return true
// }

func DeleteUser(db *sql.DB, id int, name string) bool {
	_, err := db.Exec(`DELETE FROM post WHERE username = ?`, name)
	if err != nil {
		fmt.Println(err)
		return false
	} else {
		_, err := db.Exec(`DELETE FROM comment WHERE username = ?`, name)
		if err != nil {
			fmt.Println(err)
			return false
		} else {
			_, err := db.Exec(`DELETE FROM likedpost WHERE userid = ?`, id)
			if err != nil {
				fmt.Println(err)
				return false
			} else {
				_, err := db.Exec(`DELETE FROM likedcomment WHERE userid = ?`, id)
				if err != nil {
					fmt.Println(err)
					return false
				} else {
					_, err := db.Exec(`DELETE FROM user WHERE id = ?`, id)
					if err != nil {
						fmt.Println(err)
						return false
					}
					return true
				}
			}
		}
	}
}

func UserExists(db *sql.DB, email string, password string) (string, int) {
	var name string
	var id int
	var pass string
	sqlStmt := `SELECT name, id FROM user WHERE email = ?`
	err := db.QueryRow(sqlStmt, email).Scan(&name, &id)
	if err != nil {
		fmt.Println("err", err)
		return "", 0
	} else {
		sqlStmt := `SELECT password FROM user WHERE name = ?`
		err := db.QueryRow(sqlStmt, name).Scan(&pass)
		if err != nil {
			fmt.Println("err", err)
			return "", 0
		} else {
			if password == pass {
				return name, id
			} else {
				return "", 0
			}
		}
	}
}

func DbtoStructComment(db *sql.DB) []Comment {
	rowsUsers, _ := db.Query("SELECT * FROM comment")
	var temptab []Comment

	for rowsUsers.Next() {
		var u Comment
		err := rowsUsers.Scan(&u.Id, &u.Content, &u.UsersName, &u.Date, &u.PostLink)
		if err != nil {
			fmt.Println(err)
		}
		u.Like = countLike(db, "likedcomment", "commentLike", u.Id)
		temptab = append(temptab, u)
	}
	return temptab
}

func InsertIntoComment(db *sql.DB, content string, Username string, PostLink int, Date int) bool {
	_, err := db.Exec(`INSERT INTO comment (contentComment, username, postLink, date) VALUES (?, ?, ?, ?)`, content, Username, PostLink, Date)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}

func DbtoStructCommunauter(db *sql.DB) []Communauter {
	rowsUsers, _ := db.Query("SELECT * FROM communauter")
	var temptab []Communauter

	for rowsUsers.Next() {
		var u Communauter
		err := rowsUsers.Scan(&u.Id, &u.Name, &u.Desc, &u.Date)
		if err != nil {
			fmt.Println(err)
		}
		temptab = append(temptab, u)
	}
	return temptab
}
func InsertIntoCommunauter(db *sql.DB, Name string, Desc string, Date string) bool {
	_, err := db.Exec(`INSERT INTO communauter (name, desc, date) VALUES (?, ?, ?)`, Name, Desc, Date)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}
func InsertIntoCategorie(db *sql.DB, Name string) bool {
	_, err := db.Exec(`INSERT INTO categorie (name) VALUES (?)`, Name)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}
func DbtoStructPost(db *sql.DB) []Post {
	rowsUsers, _ := db.Query("SELECT * FROM post")
	var temptab []Post

	for rowsUsers.Next() {
		var u Post
		err := rowsUsers.Scan(&u.Id, &u.Date, &u.CommuLink, &u.Title, &u.Content, &u.UsersName)
		if err != nil {
			fmt.Println(err)
		}
		u.Like = countLike(db, "likedpost", "postLike", u.Id)
		temptab = append(temptab, u)
	}
	return temptab
}
func InsertIntoPost(db *sql.DB, CommuLink int, Title string, Content string, UsersName string, Date int) bool {
	_, err := db.Exec(`INSERT INTO post (commuLink, title, contentPost, username, date) VALUES (?,?,?,?,?)`, CommuLink, Title, Content, UsersName, Date)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}

func countLike(db *sql.DB, table string, tableRow string, whereID int) int {
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM "+table+" WHERE "+tableRow+" = ?", whereID).Scan(&count)
	if err != nil {
		fmt.Println(err)
	}
	return count
}
