package YnnitPackage

import (
	"database/sql"
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
		CREATE TABLE IF NOT EXISTS users (
			id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL UNIQUE,
			email TEXT NOT NULL UNIQUE,
			password TEXT NOT NULL
		);
		CREATE TABLE IF NOT EXISTS communauter (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL
		);
		CREATE TABLE IF NOT EXISTS post (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			commulink INTEGER NOT NULL,
			content TEXT NOT NULL,
			user_id INTEGET NOT NULL,
			contentPost TEXT NOT NULL,
			FOREIGN KEY (commulink) REFERENCES communauter(id),
			FOREIGN KEY (user_id) REFERENCES users(id) 
		);
		CREATE TABLE IF NOT EXISTS comment (
			id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			contentComment TEXT NOT NULL,
			postlink INTEGET NOT NULL,
			FOREIGN KEY (postlink) REFERENCES post(id) 
		)
		`
	_, err = db.Exec(sqlStmt)
	if err != nil {
		log.Printf("%q: %s\n", err, sqlStmt)
		return nil
	}
	return db
}

func InsertIntoUsers(db *sql.DB, name string, email string, password string) (int64, error) {
	result, err := db.Exec(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, name, email, password)
	if err != nil {
		log.Fatal(err)
	}
	return result.LastInsertId()
}

func UpdatePassUser(db *sql.DB, password string, email string) {
	db.Exec(`UPDATE users SET password = ? WHERE email = ?`, password, email)
}

func UpdateMailUser(db *sql.DB, emailnew string, emailact string) {
	db.Exec(`UPDATE users SET email = ? WHERE email = ?`, emailnew, emailact)
}

func UpdateNameUser(db *sql.DB, name string, email string) {
	db.Exec(`UPDATE users SET name = ? WHERE email = ?`, name, email)
}

func DeleteUser(db *sql.DB, email string) {
	db.Exec(`DELETE FROM users WHERE email = ?`, email)
}

func DbtoStruct(db *sql.DB) []Users {
	rows, _ := db.Query("SELECT* FROM users")
	var temptab []Users

	for rows.Next() {
		var u Users
		err := rows.Scan(&u.Id, &u.Name, &u.Email, &u.Password)
		if err != nil {
			log.Fatal(err)
		}
		temptab = append(temptab, u)
	}
	return temptab
}
