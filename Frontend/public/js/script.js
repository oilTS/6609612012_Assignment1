// ฟังก์ชันเช็คการกรอกข้อมูลในฟอร์ม
const form = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');
form.addEventListener('input', function () {
    if (form.checkValidity()) {
        loginBtn.disabled = false;
    } else {
        loginBtn.disabled = true;
    }
});

// ฟังก์ชัน Show/Hide Password
function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const toggleIcon = document.getElementById('toggle-password-icon');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.src = './picture/hide.png'; // เปลี่ยนไอคอนเป็นรูปตาปิด
    } else {
        passwordField.type = 'password';
        toggleIcon.src = './picture/view.png'; // เปลี่ยนไอคอนเป็นรูปตาเปิด
    }
}

// ฟังก์ชันสำหรับการตรวจสอบการเข้าสู่ระบบ
form.addEventListener('submit', async function (event) {
    event.preventDefault(); // ป้องกันการส่งฟอร์ม

    // เคลียร์ข้อความ error ก่อนหน้า
    document.getElementById('username-error').innerText = '';
    document.getElementById('password-error').innerText = '';
    document.getElementById('role-error').innerText = '';

    // ตรวจสอบข้อมูลในฟอร์ม
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    let hasError = false;

    if (!usernameInput) {
        document.getElementById('username-error').innerText = 'Username cannot be empty.';
        hasError = true;
    }

    if (!passwordInput) {
        document.getElementById('password-error').innerText = 'Password cannot be empty.';
        hasError = true;
    }

    if (!role) {
        document.getElementById('role-error').innerText = 'Please select a role.';
        hasError = true;
    }

    // ถ้าไม่มีข้อผิดพลาด ทำการเรียก API เพื่อเข้าสู่ระบบ
    if (!hasError) {
        try {
            const response = await fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    "Application-Key": "TU3814a7bd7f0d8322d45b529ce7b1ddf5e7b3c9c7db824832b4ad57091638f67e78ac6e2342b5302d14e286139ba76859"
                },
                body: JSON.stringify({ UserName: usernameInput, PassWord: passwordInput }),
            });

            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials.');
            }

            const data = await response.json();
            console.log(data);

            // แสดงข้อมูลจาก API ใน HTML
            document.getElementById("space1").innerText = data.displayname_en;
            document.getElementById("space2").innerText = data.username;
            document.getElementById("space3").innerText = data.type;

        } catch (error) {
            alert(error.message);
        }
    }
});

// ฟังก์ชันจำลองการเข้าสู่ระบบ (ใช้แทน API ในการทดสอบ)
function simulateLogin(username, password, role) {
    return username === 'test' && password === '1234' && role === 'student'; // ตัวอย่างข้อมูลจำลอง
}

function requestForm() {
    alert('Request Form Clicked');
}

function dashboard() {
    alert('Dashboard Clicked');
}

function logout() {
    alert('Logout Clicked');
}
