
const regTemplate = (name, email) => {
    return `<div>
                <h1 style="color:slateblue">Hi ${name}, Welcom to CMS-v1.0</h1>
                <article style="margin:auto;object-fit:cover;">
                    <img src="https://i.pinimg.com/originals/d8/93/e2/d893e298abaff443e86ce941079aa77d.png" width="300" height="300"/>
                    <h4> We are excited to have you. Get started with mail id = <span style="color:orangered"> ${email} </span>. Your account is ready.</h4>
                </article>
            </div>`
}

module.exports = regTemplate