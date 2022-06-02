package main

import (
	Ynnit "YnnitPackage/Ynnit"
)

type User struct {
	ID     string `database="id"`
	Pseudo string `database="pseudo"`
	Email  string `database="email"`
	Age    int    `database="age"`
}

func main() {
	Ynnit.Handler()
}
