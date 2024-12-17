class SubscribeComponent extends HTMLElement {
    constructor() {
        super();
        
        // Create a shadow DOM
        this.attachShadow({ mode: 'open' });
        
        // Add HTML and CSS
        this.shadowRoot.innerHTML = `
            <style>
                .subscribe-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    max-width: 280px;
                    margin: 0px auto;
                    gap: 10px;
                    padding: 0 0px;
                }

                .email-input,
                .subscribe-button {
                    width: 100%;
                    padding: 7px;
                    font-size: 14px;
                    border: 1.5px solid black;
                    border-radius: 8px;
                    outline: none;
                    box-sizing: border-box;
                }

                .subscribe-button {
                    background-color: black;
                    color: white;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .subscribe-button:hover {
                    background-color: white;
                    color: black;
                }

                .subscribe-button[disabled] {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .spinner {
                    width: 20px;
                    height: 20px;
                    border: 2px solid #ffffff;
                    border-top: 2px solid transparent;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    display: none;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>

            <div class="subscribe-container">
                <input type="email" class="email-input" placeholder="Enter your email" autocomplete="email">
                <button class="subscribe-button">
                    <span class="button-text">Subscribe</span>
                    <span class="spinner"></span>
                </button>
            </div>
        `;

        this._handleSubscribe = this._handleSubscribe.bind(this);
        this.shadowRoot.querySelector('.subscribe-button').addEventListener('click', this._handleSubscribe);
    }

    async _handleSubscribe() {
        const emailInput = this.shadowRoot.querySelector('.email-input');
        const button = this.shadowRoot.querySelector('.subscribe-button');
        const buttonText = button.querySelector('.button-text');
        const spinner = button.querySelector('.spinner');
        
        const email = emailInput.value.trim();
        if (!email || !email.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }

        buttonText.style.display = 'none';
        spinner.style.display = 'inline-block';
        button.disabled = true;
        emailInput.disabled = true;

        try {
            await fetch('https://script.google.com/macros/s/AKfycbxSjuvqBxEXuCJJpX2Yqiyli9vJpcYksukmw0k3Lik8QMY3KcKezV65QvNwneniMAc/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email })
            });

            buttonText.textContent = 'Subscribed!';
            emailInput.value = '';
            
        } catch (error) {
            buttonText.textContent = 'Error! Try again';
            console.error('Error:', error);
        }

        spinner.style.display = 'none';
        buttonText.style.display = 'inline-block';
        button.disabled = false;
        emailInput.disabled = false;

        setTimeout(() => {
            buttonText.textContent = 'Subscribe to my life';
        }, 3000);
    }
}

// Register the custom element
customElements.define('subscribe-form', SubscribeComponent); 