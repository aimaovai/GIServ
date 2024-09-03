export const checkLoggedIn = () => {
    let loggedin = localStorage.getItem("loggedin")

    console.log("isUserLoggedin", loggedin)

    if (!loggedin) {
        window.location.href = "/"
        alert("User is not logged in")
    }
}
