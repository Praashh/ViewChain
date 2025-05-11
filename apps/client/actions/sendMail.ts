"use server"

import { transporter, user } from "@/lib/mail";

interface EmailResponse {
  success: boolean;
  error?: string;
}

export const sendEmailNotification = async (to: string): Promise<EmailResponse> => {
    const mailOptions = {
      from: {
        name: "Viewchain",
        address: user,
      },
      to: to,
      subject: "Welcome to ViewChain - Your Account is Ready!",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ViewChain</title>
    <style type="text/css">
        /* Base styles */
        body, html {
            margin: 0;
            padding: 0;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f7f7f7;
        }
        
        /* Container */
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        
        /* Header */
        .header {
            background-color: #1a237e;
            padding: 30px 20px;
            text-align: center;
            color: white;
        }
        
        .logo {
            color: white;
            font-size: 24px;
            font-weight: bold;
            text-decoration: none;
        }
        
        /* Content */
        .content {
            padding: 30px;
        }
        
        h1 {
            color: #1a237e;
            margin-top: 0;
            font-size: 24px;
        }
        
        p {
            margin-bottom: 20px;
            font-size: 16px;
        }
        
        .highlight {
            background-color: #f5f5f5;
            padding: 15px;
            border-radius: 4px;
            font-family: monospace;
            word-break: break-all;
        }
        
        /* Button */
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #1a237e;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
        }
        
        /* Footer */
        .footer {
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #999999;
            background-color: #f5f5f5;
        }
        
        .social-links a {
            margin: 0 5px;
            text-decoration: none;
        }
        
        /* Responsive */
        @media screen and (max-width: 480px) {
            .content {
                padding: 20px;
            }
            
            h1 {
                font-size: 20px;
            }
            
            p {
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <a href="https://viewchain.xyz" class="logo">VIEWCHAIN</a>
        </div>
        
        <!-- Content -->
        <div class="content">
            <h1>Welcome to ViewChain!</h1>
            <p>Thank you for creating an account with us. We're excited to have you on board.</p>
            <p>Your account has been successfully created with the following email address:</p>
            
            <div class="highlight">
                ${to}
            </div>
            
            <p>With your ViewChain account, you can now access our platform's features and services.</p>
            
            <p>If you didn't request this account, please ignore this email or contact our support team.</p>
            
            <a href="https://viewchain.xyz/api/auth/signin" class="button">Login to Your Account</a>
            
            <p>Need help? <a href="https://discord.gg/Y3KCUBADsC">Contact our support team</a> and we'll be happy to assist you.</p>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ViewChain. All rights reserved.</p>
            <p>
                <a href="https://viewchain.xyz">Privacy Policy</a> | 
                <a href="https://viewchain.xyz">Terms of Service</a>
            </p>
            <div class="social-links">
                <a href="https://twitter.com/viewchain">Twitter</a>
                <a href="https://twitter.com/viewchain">LinkedIn</a>
                <a href="https://twitter.com/viewchain">Facebook</a>
            </div>
        </div>
    </div>
</body>
</html>
          `.trim(),
    };

    try {
      await transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      console.error("Error sending email:", error);
      return { 
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      };
    }
};