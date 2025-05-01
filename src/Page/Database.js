// constants

export const Webcode2 = `
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>luxury Beauty Lounge</title>
    <style>
        :root {
            --primary-color: #f1ebeb;
            --secondary-color: #eabcba;
            --accent-color: #d96b6b;
            --font-family: "Noto Sans TC", sans-serif;
        }
        body {
            margin: 0;
            font-family: var(--font-family);
            background: linear-gradient(120deg, var(--primary-color), var(--secondary-color));
            color: #222;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        header {
            background: rgba(255,255,255,0.9);
            padding: 20px 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header-title {
            text-align: center;
            font-size: 3em;
            color: var(--accent-color);
            text-shadow: 2px 2px 3px rgba(217,107,107,0.3);
        }
        nav {
            display: flex;
            justify-content: center;
            padding: 15px 0;
        }
        nav a {
            margin: 0 20px;
            text-decoration: none;
            color: #333;
            position: relative;
        }
        nav a::after {
            content: '';
            width: 0%;
            height: 2px;
            background: var(--accent-color);
            position: absolute;
            left: 0;
            bottom: -5px;
            transition: 0.3s;
        }
        nav a:hover::after {
            width: 100%;
        }
        /* 主要內容區 */
        .hero-section {
            padding: 80px 0;
            background: linear-gradient(145deg, #fff, var(--secondary-color));
        }
        h2 {
            font-weight: 700;
            color: var(--accent-color);
            position: relative;
        }
        h2::before {
            content: '';
            width: 40px;
            height: 40px;
            background: var(--accent-color);
            border-radius: 50%;
            position: absolute;
            top: 0;
            left: -45px;
        }
        .service-box {
            background: #fff;
            padding: 30px;
            margin: 20px 0;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        .service-box h3 {
            color: var(--accent-color);
            position: relative;
            display: inline-block;
            padding-bottom: 10px;
        }
        .service-box h3::after {
            content: '';
            width: 30px;
            height: 3px;
            background: var(--accent-color);
            display: block;
            margin-top: 5px;
        }
        .testimonials {
            background: var(--primary-color);
            padding: 50px 0;
        }
        .testimonials .container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 30px;
        }
        .testimonials .quote {
            border-left: 5px solid var(--accent-color);
            padding-left: 20px;
            max-width: 400px;
        }
        footer {
            background: #222;
            padding: 30px 0;
            text-align: center;
            color: #ddd;
            font-size: 0.9em;
        }
        footer a {
            color: var(--accent-color);
            text-decoration: none;
        }
        footer a:hover {
            border-bottom: 2px solid var(--accent-color);
        }
        @media (max-width: 768px) {
            .header-title { font-size: 2.2em; }
            .service-box { padding: 20px; }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <h1 class="header-title">LUMIÈRE BEAUTY</h1>
            <nav>
                <a href="#about">關於我們</a>
                <a href="#services">服務項目</a>
                <a href="#testimonials">客戶好評</a>
                <a href="#contact">預約洽詢</a>
            </nav>
        </div>
    </header>

    <section class="hero-section container" id="about">
        <h2>以藝術重新定義美學</h2>
        <p>結合法式時尚與東方美學的奢華造型體驗<br>使用高端護理產品與個性化服務方案</p>
    </section>

    <section class="services section" id="services">
        <div class="container">
            <h2>旗艦服務項目</h2>
            <div class="service-box">
                <h3>奢華護髮疗程</h3>
                <p>使用CHÉLAN專業線系列<br>3階段修護技術 (頭皮淨化/毛髮修復/滋潤養護)</p>
            </div>
            <div class="service-box">
                <h3>3D立體髮際塑造</h3>
                <p>法式精緻接髮技術<br>客製化髮際線設計服務</p>
            </div>
            <div class="service-box">
                <h3>專屬造型師顧問</h3>
                <p>一對一髮型診所服務<br>定期造型跟蹤服務</p>
            </div>
        </div>
    </section>

    <section class="testimonials section" id="testimonials">
        <div class="container">
            <h2>來自賓客的驚喜評價</h2>
            <div class="quote">
                「這次的接髮服務完全超越預期，<br>造型師根據我的 얼굴형狀（臉型）設計的最適髮型！」
                <cite>- 金小姐，首爾</cite>
            </div>
            <div class="quote">
                「護理護髮後頭皮症狀大幅改善，<br>終於找到合適的專業理髮院！
                <cite>- 張先生，濟州</cite>
            </div>
        </div>
    </section>

    <section id="contact" class="contact-section">
        <div class="container">
            <h2>預約與聯絡方式</h2>
            <form action="#" method="post">
                <input type="text" placeholder="姓名" required>
                <input type="email" placeholder="電子郵件" required>
                <textarea placeholder="預約需求與說明" rows="4"></textarea>
                <button type="submit" style="background: var(--accent-color); color: white; padding:12px 30px; border-radius:25px;">
                    立即預約
                </button>
            </form>
        </div>
    </section>

    <footer>
        <div class="container">
            <p>© 2024 LUMIÈRE BEAUTY. All rights reserved.</p>
            <p> Address: 首爾特別市江南區論현로 123 | <a href="#">線上預約系統</a> | <a href="#">隱私權保護政策</a></p>
        </div>
    </footer>
</body>
</html>`

export const Webcode = `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>AI競賽形象網頁</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #1a1a1a;
            color: #f5f5f5;
            margin: 0;
            padding: 0;
        }

        header {
            background: linear-gradient(45deg, #00bcd4, #ff4081);
            color: white;
            padding: 20px;
            text-align: center;
        }

        header h1 {
            font-size: 3em;
            margin: 0;
        }

        nav {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }

        nav a {
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            margin: 0 15px;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }

        nav a:hover {
            background-color: rgba(255, 255, 255, 0.5);
        }

        .container {
            width: 80%;
            margin: 50px auto;
        }

        .section {
            margin: 50px 0;
        }

        h2 {
            color: #00bcd4;
            font-size: 2.5em;
            text-align: center;
        }

        .competition-details, .leaderboard, .registration {
            background: rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 10px;
        }

        .leaderboard table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        .leaderboard table, .leaderboard th, .leaderboard td {
            border: 1px solid #00bcd4;
        }

        .leaderboard th, .leaderboard td {
            padding: 15px;
            text-align: center;
        }

        .registration form {
            display: flex;
            flex-direction: column;
        }

        .registration input, .registration button {
            padding: 12px;
            margin: 10px 0;
            border-radius: 5px;
            border: 2px solid #00bcd4;
            font-size: 1em;
            width: 100%;
        }

        .registration button {
            background-color: #00bcd4;
            color: white;
            cursor: pointer;
        }

        .registration button:hover {
            background-color: #ff4081;
        }

        footer {
            background: #1a1a1a;
            color: #f5f5f5;
            text-align: center;
            padding: 20px;
            position: fixed;
            bottom: 0;
            width: 100%;
        }
    </style>
</head>
<body>
    <header>
        <h1>AI競賽 - 未來科技挑戰</h1>
        <nav>
            <a href="#details">競賽詳情</a>
            <a href="#leaderboard">即時排行榜</a>
            <a href="#registration">註冊參賽</a>
        </nav>
    </header>

    <div class="container">
        <section id="details" class="section competition-details">
            <h2>競賽詳情</h2>
            <p>加入AI競賽，挑戰前沿科技，展示你的AI技術與創新。無論是個人開發者還是團隊，這是展現實力的最佳平台！</p>
            <ul>
                <li><strong>開始日期：</strong>2025年6月1日</li>
                <li><strong>結束日期：</strong>2025年6月30日</li>
                <li><strong>獎金：</strong>超過10萬元獎金池</li>
                <li><strong>競賽項目：</strong>AI模型訓練、資料處理、AI解決方案設計</li>
            </ul>
        </section>

        <section id="leaderboard" class="section leaderboard">
            <h2>即時排行榜</h2>
            <table>
                <thead>
                    <tr>
                        <th>排名</th>
                        <th>隊伍名稱</th>
                        <th>分數</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>AI神話</td>
                        <td>1000</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>智勇雙全</td>
                        <td>950</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>深度學習者</td>
                        <td>900</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section id="registration" class="section registration">
            <h2>註冊參賽</h2>
            <form>
                <input type="text" placeholder="隊伍名稱" required>
                <input type="email" placeholder="聯絡郵箱" required>
                <input type="text" placeholder="簡短介紹" required>
                <button type="submit">註冊參賽</button>
            </form>
        </section>
    </div>

    <footer>
        <p>&copy; 2025 AI競賽 | 所有權利保留</p>
    </footer>
</body>
</html>`

export const BrandHTML = `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>科技創新形象網站</title>
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background: #f5f7fa;
      color: #333;
    }

    header {
      background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
      padding: 1.5rem 2rem;
      color: white;
      text-align: center;
    }

    nav {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-top: 0.5rem;
    }

    nav a {
      color: #eee;
      text-decoration: none;
      font-weight: bold;
      transition: color 0.3s ease;
    }

    nav a:hover {
      color: #ffd700;
    }

    .hero {
      text-align: center;
      padding: 4rem 2rem;
      background: #ffffff;
    }

    .hero h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .hero p {
      font-size: 1.2rem;
      color: #666;
      max-width: 600px;
      margin: 0 auto;
    }

    .features {
      display: flex;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;
      padding: 3rem 2rem;
      background: #f0f0f0;
    }

    .feature-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      padding: 2rem;
      max-width: 300px;
      text-align: center;
      transition: transform 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-6px);
    }

    .feature-card h3 {
      color: #2c5364;
    }

    .cta {
      text-align: center;
      padding: 2rem;
      background: #2c5364;
      color: white;
    }

    .cta button {
      background-color: #ffd700;
      color: #000;
      border: none;
      padding: 0.8rem 2rem;
      font-size: 1rem;
      border-radius: 30px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .cta button:hover {
      background-color: #e6c200;
    }

    footer {
      background: #1c1c1c;
      color: #aaa;
      text-align: center;
      padding: 1rem;
      font-size: 0.9rem;
    }
  </style>
</head>
<body>

  <header>
    <h1>創新科技品牌</h1>
    <nav>
      <a href="#">首頁</a>
      <a href="#">服務</a>
      <a href="#">關於我們</a>
      <a href="#">聯絡</a>
    </nav>
  </header>

  <section class="hero">
    <h1>啟動您的數位未來</h1>
    <p>我們專注於打造高效、現代化的網頁與應用，幫助企業快速進入數位市場。</p>
  </section>

  <section class="features">
    <div class="feature-card">
      <h3>⚡ 極速響應</h3>
      <p>網站快速載入，使用者體驗最佳化。</p>
    </div>
    <div class="feature-card">
      <h3>🎨 品牌設計</h3>
      <p>提供視覺識別、LOGO 與整體品牌形象打造。</p>
    </div>
    <div class="feature-card">
      <h3>🔒 資安第一</h3>
      <p>內建資安防護，網站更安全、客戶更安心。</p>
    </div>
  </section>

  <section class="cta">
    <h2>準備好改變未來了嗎？</h2>
    <p>立即聯絡我們，開始打造您的網站。</p>
    <button onclick="alert('感謝您的洽詢！')">立即聯絡</button>
  </section>

  <footer>
    &copy; 2024 創新科技品牌 | Powered by HTML & CSS
  </footer>
</body>
</html>`

export const project1 = {id:"1", title: 'AI Contest Challenge', date: 'May 1, 2025',
  Webcode: Webcode, file1:"Main.html", file2:"Main.css", file3:"Preview.js",
  history1:"2025/5/1 01:28, Add Competition Details", history2:"2025/5/1 02:20, New Leaderboard Information"}; 

export const project2 = {id:"2", title: 'Aesthetics & Luxury Beauty', date: 'May 2, 2025',
  Webcode: Webcode2, file1:"Index.html", file2:"Index.css", file3:"Component.js",
  history1:"2025/5/2 14:50, Background color dark", history2:"2025/5/2 16:34, Add more margin, hover activate"}; 

export const project3 = {id:"3", title: 'Responsive Tech Innovation', date: 'April 22, 2024',
  Webcode: BrandHTML, file1:"Index.html", file2:"Index.css", file3:"Component.js",
  history1:"2024/4/22 14:50, Change Light Buttom Color"};

export const project4 = {id:"4", title: 'New Design', date: 'May 3, 2025',
  Webcode: '', file1:"Index.html", file2:"Index.css", file3:"Component.js"}; 

export const All_Projects = [project1, project2, project3]

/*`<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>美麗預覽頁面</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      height: 100vh;
      background: linear-gradient(135deg, #74ebd5, #ACB6E5);
      font-family: 'Segoe UI', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .card {
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(12px);
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      padding: 2rem 3rem;
      max-width: 400px;
      text-align: center;
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .card h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .card p {
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .card button {
      background-color: #ffffff;
      color: #333;
      border: none;
      padding: 0.6rem 1.2rem;
      font-size: 1rem;
      border-radius: 30px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .card button:hover {
      background-color: #f1f1f1;
      transform: scale(1.05);
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>My Portfolio</h1>
    <p>Empowering brands through thoughtful and strategy-led marketing。<br>FULL POTENTIAL</p>
    <button onclick="alert('你點了按鈕！')">Try It Now</button>
  </div>
</body>
</html>`*/