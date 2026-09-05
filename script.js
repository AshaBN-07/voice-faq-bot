const micBtn=document.getElementById("micBtn");
const question=document.getElementById("question");
const answer=document.getElementById("answer");

const SpeechRecognition =
 window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    micBtn.addEventListener("click", () => {
        question.textContent = "Listening...";
        answer.textContent = "";
        recognition.start();
    });

    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;

        question.textContent = text;

        const faq = {
            "what is ai":
                "AI stands for Artificial Intelligence. It enables computers to perform tasks that normally require human intelligence.",

            "what is python":
                "Python is a popular programming language used for web development, data science, AI and automation.",

            "what is html":
                "HTML stands for HyperText Markup Language. It is used to create the structure of web pages."
        };

        const key = text.toLowerCase().trim();

        let response = faq[key];

        if (!response) {
            response = "Sorry, I don't know the answer to that question.";
        }

        answer.textContent = response;

        const speech = new SpeechSynthesisUtterance(response);
        speech.lang = "en-US";
        window.speechSynthesis.speak(speech);
    };

    recognition.onerror = () => {
        question.textContent = "Could not understand your voice.";
    };

} else {
    answer.textContent =
        "Sorry, your browser does not support speech recognition.";
}