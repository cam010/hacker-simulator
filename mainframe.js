var access_screen = `
-- ACCESS -- <br> 
Username: X <br>
Role: International Spy <br>
Access: Level 10 <br>
Direct Superior: HM The Queen
`;

var resources_screen = `
-- RESOURCES -- <br>
Spies:<br>
- 500 L1<br>
- 150 L2<br>
- 5 L3<br>
Guns:<br>
- 1890 Assault Rifles<br>
- 19 RPGs<br>
- 25000 Desert Eagles<br>
- 1200 Shotguns<br>
- 120 Snipers<br>
Visas:<br>
- 20993 Expired<br>
- 1205 Expiring in < 1 month<br>
- 5000 Active<br>
- 30 Frozen<br>
- 120000 Flagged<br>
Cars:<br>
- 50 High Performance<br>
- 100 City Cars<br>
- 25 Bulletproof Cars<br>
Units:<br>
- 250 Trained L5<br>
- 506 Trained L4<br>
- 1045 Trained L3<br>
- 5185 Trained L2<br>
- 9100 Trained L1<br>
`;

var commands = `
access level / access: Show access levels<br>
assets / resources: show assets<br>
give money / transfer: get 100k in your balance<br>
logout: logout
`

// not my function
function nl2br(str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
// mine after
var result_string_char = 0;

balance = 900000; //900k;

function add_input_box() {
    let x = document.createElement("INPUT");
    x.setAttribute("type", "text");
    x.setAttribute("id", "InputBox");
    x.setAttribute("placeholder", "Enter Command...")
    document.body.appendChild(x);
    add_event_listener();
    window.scrollTo(0, document.body.scrollHeight);
}

function add_event_listener() {
    document.getElementById("InputBox").addEventListener('keyup', (e) => {
        if (e.keyCode == 13) {
            get_input();
            remove_input_box();
        }
    });
}

function remove_input_box() {
    let input_box = document.getElementById("InputBox");
    input_box.remove();
}

function get_input() {
    let text = document.getElementById("InputBox").value;
    check_input(text.toLowerCase());
}

async function check_input(input) {
    switch (input) {
        case "access level":
        case "access":
            add_p_to_screen(access_screen + '<br>');
            await new Promise(r => setTimeout(r, 0));
            break;
        case "assets":
        case "resources":
            add_p_to_screen("Loading assets...");
            await new Promise(r => setTimeout(r, 1000));
            add_p_to_screen(resources_screen + '<br>');
            break;
        case "give money":
        case "transfer":
            // add_p_to_screen("Adding $100000 to your bank account...");
            // await new Promise(r => setTimeout(r, 1000));
            // add_p_to_screen("Gathering funds from company...");
            // await new Promise(r => setTimeout(r, 1000));
            // add_p_to_screen("Encrypting Transaction...");
            // await new Promise(r => setTimeout(r, 1000));
            // add_p_to_screen("Transaction Successful. Removing Traces.<br>");
            // balance += 100000;
            // await new Promise(r => setTimeout(r, 1000));
            await new Promise(r => setTimeout(r, 1000));
            add_p_to_screen("Command Outdated<br>")
            break;
        case "commands":
            add_p_to_screen(commands + '<br>');
            await new Promise(r => setTimeout(r, 0));
            break;
        case "logout":
            window.location.reload();
            break;
        default:
            add_p_to_screen("Unknown Command.<br>");
            await new Promise(r => setTimeout(r, 0));
    };
    add_input_box();
}

function add_p_to_screen(text) {
    let y = document.getElementById("Scrollable");
    x = `${text}<br>`;
    y.innerHTML += x
    y.scrollTop = y.scrollHeight;
}

function get_login_details() {
    let x = document.getElementById("LoginUsername").value;
    let y = document.getElementById("LoginPassword").value;
    return [x, y];
}

function check_login_details() {
    let x = get_login_details();
    y = x[1];
    x = x[0];
    if (x == "MI6admin1" && y == "Adm1n@Pwd10") {
        return true;
    }
}

function remove_login_widgets() {
    document.getElementById("LoginButton").remove();
    document.getElementById("LoginUsername").remove();
    document.getElementById("LoginPassword").remove();
    document.getElementById("CrackPwd").remove();
    document.getElementById("CrackPwdSuccess").remove();
    document.getElementById("IncorrectDetails").remove();
    document.getElementById("MainframeP").remove();
}

function login() {
    if (check_login_details() == true) {
        remove_login_widgets();
        // document.documentElement.requestFullscreen(); used in iframe so not useful
        document.getElementById("para").innerHTML = "You are logged in as MI6admin1...<br>type 'commands' to get started";
        add_input_box();
    } else {
        console.log("false");
        create_crack_pwd_btn();
        edit_incorrect_p("Incorrect Details")
    }

}

function create_crack_pwd_btn() {
    try {
        let x = document.getElementById("CrackPwd").innerHTML;
    } catch (error) {
        let x = document.createElement("button");
        x.setAttribute("id", "CrackPwd");
        x.innerHTML = "Crack Details";
        document.body.appendChild(x);
        document.getElementById("CrackPwd").addEventListener('click', crack_pwd);
    }

}

function crack_pwd() {
    document.getElementById("LoginButton").disabled = true;
    create_p_pwd_status();
    document.getElementById("LoginUsername").value = "MI6admin1";
    add_vals_to_pwd();
}

async function add_vals_to_pwd() {
    let x = document.getElementById("LoginPassword");
    await new Promise(r => setTimeout(r, 500));
    x.value = "Password";
    await new Promise(r => setTimeout(r, 500));
    x.value = "Password2";
    await new Promise(r => setTimeout(r, 500));
    x.value = "Password@";
    await new Promise(r => setTimeout(r, 500));
    x.value = "Admin";
    await new Promise(r => setTimeout(r, 500));
    x.value = "Adm1n@Pwd10";
    edit_p_pwd_status("Cracking Success. You can login now.");
    document.getElementById("LoginButton").disabled = false;
}

function create_p_pwd_status() {
    let x = document.createElement("p");
    x.setAttribute("id", "CrackPwdSuccess");
    document.body.appendChild(x);
    edit_p_pwd_status("Cracking...");
}

function edit_p_pwd_status(str) {
    let x = document.getElementById("CrackPwdSuccess");
    x.innerHTML = str;
}

function create_incorrect_p() {
    try {
        let x = document.getElementById("IncorrectDetails").innerHTML;
    } catch (error) {
        let x = document.createElement("p");
        x.setAttribute("id", "IncorrectDetails");
        document.body.appendChild(x);
    }
}

function edit_incorrect_p(str) {
    let x = document.getElementById("IncorrectDetails");
    x.innerHTML = str;
}


document.getElementById("LoginButton").addEventListener('click', login);
create_incorrect_p()