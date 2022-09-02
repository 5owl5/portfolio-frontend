const nodemailer = require("nodemailer");

class MailAuthService {
  static async sendMail({ email, randomNumber }) {
    const authUser = process.env.AUTH_USER || null;
    const authPass = process.env.AUTH_PASS || null;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: authUser,
        pass: authPass,
      },
    });

    const htmlcontent = `<div><h2>아래 인증코드를 입력 해주세요.</h2>
    <h1>인증코드: ${randomNumber}</h1>
  </div>`;

    const mailOptions = {
      from: {
        name: "5손도손 우리42 서비스팀",
        address: "5son.doson42@gmail.com",
      },
      to: email,
      subject: "5손도손 우리42 이메일 인증 서비스",
      html: htmlcontent,
      text: "인증메일",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        const errorMessage = "인증메일 발송에 실패 했습니다.";
        return { errorMessage };
      }
      const errorMessage = null;
      transporter.close();
      return { errorMessage };
    });
  }
}

export { MailAuthService };
