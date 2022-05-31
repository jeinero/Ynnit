package YnnitPackage

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

var users = []Users{
	{Id: 1, Name: "riojaneiro", Email: "riojaneiro@gmx.com", Password: "Ouais"},
	{Id: 2, Name: "bocmacfrite", Email: "bocmacfrite@gmx.com", Password: "Nope"},
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello Home!")
}

func UsersHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello Users!")
	json.NewEncoder(w).Encode(users)
}

func Handler() {
	r := mux.NewRouter()
	r.HandleFunc("/", HomeHandler)
	r.HandleFunc("/users/{key}", UsersHandler)
	http.Handle("/", r)
	log.Fatal(http.ListenAndServe(":8080", r))
}
