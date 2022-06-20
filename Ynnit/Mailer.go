package YnnitPackage

import (
	"log"
	"strconv"

	mail "github.com/xhit/go-simple-mail/v2"
)

var htmlBody = `
<html>
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   <title>Hello, World</title>
</head>
<body>
   <p>Welcome, please click on the link before sign-in ;)</p> <a href="localhost:8080/check"></a>
</body>
`

func sendMail(emailMan string, name string, id int) {
	var htmlBody = `
<html>
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   <title>Hello, World</title>
</head>
<body>
   <p>Welcome, please click on the link before sign-in ;)</p> <a href="localhost:8080/check/"></a>
</body>
`

	strconv.Itoa(id)
	server := mail.NewSMTPClient()
	server.Host = "mail.gmx.com"
	server.Port = 587
	server.Username = "fernandez.lucas@gmx.fr"
	server.Password = "qsdfghjklm1"
	server.Encryption = mail.EncryptionTLS

	smtpClient, err := server.Connect()
	if err != nil {
		log.Fatal(err)
	}
	email := mail.NewMSG()
	email.SetFrom("From Me <fernandez.lucas@gmx.fr>")
	email.AddTo(emailMan)
	email.SetSubject("Welcome to Ynnit " + name + " !")
	email.SetBody(mail.TextHTML, htmlBody)
	// email.AddAlternative(mail.TextPlain, "Hello Gophers!")
	err = email.Send(smtpClient)
	if err != nil {
		log.Fatal(err)
	}
}
