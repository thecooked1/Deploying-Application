"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BACKEND_IP_PLACEHOLDER = "146.255.226.194";
const BACKEND_PORT = 3001;
const BACKEND_API_GET_URL = `http://${BACKEND_IP_PLACEHOLDER}:${BACKEND_PORT}/api/get-answer`;
const answerSpan = document.getElementById('answer');
function fetchAndUpdateAnswer() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!answerSpan) {
            console.error("Could not find the #answer span element.");
            return;
        }
        console.log(`Fetching from: ${BACKEND_API_GET_URL}`);
        try {
            const response = yield fetch(BACKEND_API_GET_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
            }
            const result = yield response.json();
            if (result && typeof result.data === 'string') {
                answerSpan.textContent = result.data;
                answerSpan.className = ''; // Reset class
            }
            else if (result.data === null) {
                answerSpan.textContent = "No data available yet.";
                answerSpan.className = 'loading-text';
            }
            else {
                answerSpan.textContent = "Received unexpected data format from backend.";
                answerSpan.className = 'error-text';
            }
        }
        catch (error) {
            console.error("Error fetching answer:", error);
            answerSpan.textContent = `Error fetching data. Is backend at ${BACKEND_API_GET_URL} running?`;
            answerSpan.className = 'error-text';
        }
    });
}
// Initial fetch
fetchAndUpdateAnswer();
// Poll every 3 seconds
setInterval(fetchAndUpdateAnswer, 3000);
// A small check to remind the developer to replace the placeholder
/*if (BACKEND_IP_PLACEHOLDER === "146.255.226.194") {
    console.warn(
        "Reminder: Update 'YOUR_BACKEND_IP_OR_HOSTNAME' in frontend/src/main.ts " +
        "with the actual IP or hostname of your backend server."
    );
    if(answerSpan) {
        const warningMsg = document.createElement('p');
        warningMsg.innerHTML = `<strong>Configuration Needed:</strong> Please update <code>YOUR_BACKEND_IP_OR_HOSTNAME</code> in <code>frontend/src/main.ts</code>.`;
        warningMsg.style.color = "red";
        warningMsg.style.marginTop = "10px";
        answerSpan.parentElement?.appendChild(warningMsg);
    }
}*/ 
