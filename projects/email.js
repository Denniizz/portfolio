const form = document.querySelector(".contact-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("[name='name']").value;
    const email = document.querySelector("[name='email']").value;
    const message = document.querySelector("[name='message']").value;

    const subject = `Portfolio message from ${name}`;
    const body = `
        Name: ${name}
        Email: ${email}

        Message:
        ${message}
        `;

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=denizmustafov6@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailLink, "_blank");
});