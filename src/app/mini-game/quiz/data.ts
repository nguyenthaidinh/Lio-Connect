// app/mini-game/quiz/data.ts

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type QuizTopic = {
  id: string;          // key dùng trong URL: ?topic=id
  name: string;        // tên hiển thị
  icon: string;        // emoji
  description: string; // mô tả ngắn
  questions: QuizQuestion[];
};

/* ----------------- NGÂN HÀNG CÂU HỎI THEO CHỦ ĐỀ ----------------- */

export const questionsByTopic: Record<string, QuizQuestion[]> = {
  // --- CHỦ ĐỀ 1: BẠO LỰC MẠNG (CYBERBULLYING) ---
  cyberbullying: [
    {
      id: "cyber-1",
      question:
        "Hành vi nào sau đây là 'Cyberstalking' (rình rập trên mạng)?",
      options: [
        "Like ảnh của bạn bè",
        "Theo dõi vị trí, lịch trình và liên tục nhắn tin quấy rối",
        "Xem story của người nổi tiếng",
        "Kết bạn với người quen",
      ],
      correctIndex: 1,
      explanation:
        "Cyberstalking là việc sử dụng công nghệ để theo dõi, giám sát và quấy rối người khác một cách dai dẳng.",
    },
    {
      id: "cyber-2",
      question:
        "Bạn nên làm gì khi nhận được email đe dọa từ một người ẩn danh?",
      options: [
        "Xóa ngay lập tức",
        "Trả lời lại để hỏi cho ra lẽ",
        "Không trả lời, lưu lại bằng chứng và báo người lớn",
        "Gửi email đó cho bạn bè xem",
      ],
      correctIndex: 2,
      explanation:
        "Không tương tác để tránh leo thang, nhưng cần lưu bằng chứng để cơ quan chức năng xử lý.",
    },
    {
      id: "cyber-3",
      question: "Hành vi 'Catfishing' nghĩa là gì?",
      options: [
        "Đi câu cá online",
        "Giả mạo danh tính người khác để lừa đảo hoặc bắt nạt",
        "Nuôi mèo ảo",
        "Bán hàng online",
      ],
      correctIndex: 1,
      explanation:
        "Catfishing là tạo hồ sơ giả mạo (thường là người hấp dẫn) để lừa gạt tình cảm hoặc bắt nạt nạn nhân.",
    },
    {
      id: "cyber-4",
      question:
        "Đâu là hậu quả của việc chia sẻ mật khẩu Facebook cho 'người yêu online'?",
      options: [
        "Chứng tỏ tình yêu đích thực",
        "Không sao cả",
        "Có nguy cơ bị đánh cắp tài khoản và bôi nhọ danh dự",
        "Được Facebook khen thưởng",
      ],
      correctIndex: 2,
      explanation:
        "Mật khẩu là riêng tư. Chia sẻ mật khẩu dẫn đến nguy cơ mất kiểm soát tài khoản và lộ thông tin cá nhân.",
    },
    {
      id: "cyber-5",
      question:
        "Khi thấy một nhóm chat đang nói xấu tập thể một bạn trong lớp, hành động đúng đắn là?",
      options: [
        "Tham gia hùa theo",
        "Im lặng xem",
        "Chụp màn hình báo giáo viên và rời nhóm",
        "Mời nạn nhân vào nhóm để họ tự đọc",
      ],
      correctIndex: 2,
      explanation:
        "Báo cáo sự việc giúp ngăn chặn hành vi bắt nạt lan rộng và bảo vệ nạn nhân.",
    },
    {
      id: "cyber-6",
      question: "Luật An ninh mạng Việt Nam nghiêm cấm hành vi nào?",
      options: [
        "Đăng ảnh đi du lịch",
        "Thông tin sai sự thật, xúc phạm danh dự nhân phẩm người khác",
        "Bán hàng online có đóng thuế",
        "Livestream hát karaoke",
      ],
      correctIndex: 1,
      explanation:
        "Xúc phạm danh dự, nhân phẩm và tung tin giả là hành vi vi phạm pháp luật nghiêm trọng.",
    },
    {
      id: "cyber-7",
      question:
        "Thế nào là 'Happy Slapping' trong bạo lực học đường thời đại số?",
      options: [
        "Vỗ tay vui vẻ",
        "Quay clip cảnh đánh bạn rồi tung lên mạng để giải trí",
        "Chụp ảnh selfie",
        "Hát chúc mừng sinh nhật",
      ],
      correctIndex: 1,
      explanation:
        "Đây là hành vi tấn công vật lý nạn nhân nhằm mục đích quay video câu view, gây tổn thương kép.",
    },
    {
      id: "cyber-8",
      question:
        "Nên cài đặt chế độ riêng tư cho bài đăng trên mạng xã hội như thế nào?",
      options: [
        "Công khai (Public) cho cả thế giới xem",
        "Chỉ bạn bè (Friends) hoặc tùy chỉnh",
        "Không cần cài đặt gì",
        "Để chế độ 'Mọi người' để nổi tiếng nhanh",
      ],
      correctIndex: 1,
      explanation:
        "Giới hạn người xem giúp bảo vệ thông tin cá nhân khỏi kẻ xấu và những kẻ bắt nạt tiềm năng.",
    },
    {
      id: "cyber-9",
      question:
        "Phát tán ảnh 'nhạy cảm' của người khác lên mạng là hành vi?",
      options: [
        "Trêu đùa vô hại",
        "Vi phạm pháp luật và đạo đức nghiêm trọng",
        "Giúp người đó nổi tiếng",
        "Không sao nếu che mặt",
      ],
      correctIndex: 1,
      explanation:
        "Hành vi này xâm phạm quyền nhân thân, có thể bị truy cứu trách nhiệm hình sự và để lại hậu quả tâm lý lâu dài.",
    },
    {
      id: "cyber-10",
      question: "Cụm từ 'Think before you click' nhắc nhở điều gì?",
      options: [
        "Bấm chuột thật nhanh",
        "Suy nghĩ kỹ hậu quả trước khi đăng tải hoặc bình luận",
        "Không cần suy nghĩ",
        "Nên mua chuột máy tính xịn",
      ],
      correctIndex: 1,
      explanation:
        "Mọi thứ đưa lên mạng đều khó xóa bỏ hoàn toàn (dấu chân số), nên cần cân nhắc kỹ.",
    },
        {
      id: "cyber-11",
      question: "Khi bị người lạ nhắn tin gạ gửi ảnh riêng tư, bạn nên làm gì?",
      options: [
        "Gửi cho vui",
        "Chỉ gửi nếu người đó hứa giữ bí mật",
        "Chặn tài khoản, không gửi và báo với người lớn/nhà trường",
        "Chửi lại cho hả giận"
      ],
      correctIndex: 2,
      explanation:
        "Ảnh riêng tư có thể bị phát tán và tống tiền. Cách an toàn nhất là không gửi, chặn và báo người lớn."
    },
    {
      id: "cyber-12",
      question: "Dấu hiệu nhận biết một tin giả (fake news) trên mạng là gì?",
      options: [
        "Tiêu đề giật gân, không ghi rõ nguồn",
        "Có nhiều lượt chia sẻ",
        "Có nhiều bình luận",
        "Bạn thân gửi cho mình"
      ],
      correctIndex: 0,
      explanation:
        "Tin giả thường dùng tiêu đề sốc, thiếu nguồn chính thống để thu hút lượt xem."
    },
    {
      id: "cyber-13",
      question: "Khi bạn lỡ share một tin sai sự thật, việc nên làm là?",
      options: [
        "Xóa đi và giả vờ như chưa từng đăng",
        "Để nguyên vì đã nhiều người xem",
        "Xóa, đính chính lại và xin lỗi",
        "Đổ lỗi cho người đã gửi tin cho mình"
      ],
      correctIndex: 2,
      explanation:
        "Đính chính và xin lỗi giúp giảm tác hại của tin sai và thể hiện trách nhiệm với cộng đồng mạng."
    },
    {
      id: "cyber-14",
      question: "Mật khẩu an toàn nên có đặc điểm nào?",
      options: [
        "Dễ nhớ: 123456, ngày sinh",
        "Ngắn, chỉ gồm chữ thường",
        "Dài trên 8 ký tự, gồm chữ hoa, thường, số và ký tự đặc biệt",
        "Giống với tên tài khoản"
      ],
      correctIndex: 2,
      explanation:
        "Mật khẩu mạnh giúp hạn chế bị hack tài khoản, đặc biệt với tài khoản email và mạng xã hội."
    },
    {
      id: "cyber-15",
      question: "Tại sao không nên đăng vị trí hiện tại (check-in) liên tục?",
      options: [
        "Vì tốn pin",
        "Vì bạn bè sẽ ghen tị",
        "Vì kẻ xấu có thể nắm lịch trình, gây nguy hiểm cho bạn và gia đình",
        "Vì Facebook cấm"
      ],
      correctIndex: 2,
      explanation:
        "Đăng vị trí thời gian thực khiến bạn dễ bị theo dõi ngoài đời thật."
    },
    {
      id: "cyber-16",
      question: "Một người lập group để bêu xấu bạn trong trường. Việc nên làm?",
      options: [
        "Tham gia group để cãi nhau",
        "Tạo group khác để nói xấu lại",
        "Báo cáo group cho nền tảng và báo giáo viên/nhà trường",
        "Xin vào group để xem người ta nói gì"
      ],
      correctIndex: 2,
      explanation:
        "Báo cáo tới người có trách nhiệm giúp xử lý tận gốc, tránh leo thang bạo lực mạng."
    },
    {
      id: "cyber-17",
      question: "Chia sẻ mật khẩu Wi-Fi lớp cho người lạ có thể dẫn đến điều gì?",
      options: [
        "Không sao, Wi-Fi là của chung",
        "Bị dùng để truy cập trái phép, tải nội dung xấu, ảnh hưởng đến cả trường",
        "Chỉ bị chậm mạng",
        "Được người lạ cảm ơn"
      ],
      correctIndex: 1,
      explanation:
        "Tài khoản mạng có thể bị lợi dụng để truy cập, tải về nội dung vi phạm pháp luật."
    },
    {
      id: "cyber-18",
      question: "Ứng xử văn minh khi tranh luận trên mạng là?",
      options: [
        "Chửi bới, gắn nhãn người khác",
        "Tấn công vào ngoại hình đối phương",
        "Dùng lập luận, tôn trọng sự khác biệt, không xúc phạm cá nhân",
        "Rủ bạn bè vào 'ném đá'"
      ],
      correctIndex: 2,
      explanation:
        "Tranh luận là để tìm ra sự thật, không phải để hạ nhục người khác."
    },
        {
      id: "cyber-19",
      question: "Một bạn bị bạn cùng lớp lấy ảnh thật, ghép vào meme rồi đăng lên group lớp để chế giễu. Đây là dạng bạo lực gì?",
      options: [
        "Chỉ là trò đùa bình thường",
        "Bạo lực mạng, xâm phạm danh dự",
        "Quảng cáo sáng tạo",
        "Phản biện xã hội"
      ],
      correctIndex: 1,
      explanation:
        "Ghép ảnh người khác để chế giễu trên mạng là hành vi bạo lực mạng, làm tổn thương danh dự và lòng tự trọng."
    },
    {
      id: "cyber-20",
      question: "Khi bị lập tài khoản giả mạo để nói xấu mình, bước nên làm đầu tiên là gì?",
      options: [
        "Đăng status chửi lại",
        "Rủ bạn bè vào chửi chung",
        "Báo cáo (report) tài khoản giả và lưu lại bằng chứng",
        "Bỏ qua, không cần quan tâm"
      ],
      correctIndex: 2,
      explanation:
        "Báo cáo với nền tảng và lưu bằng chứng giúp việc xử lý sau này rõ ràng hơn, tránh leo thang xung đột."
    },
    {
      id: "cyber-21",
      question: "Doxxing (bóc phốt thông tin cá nhân) là gì?",
      options: [
        "Đăng ảnh đi chơi cùng bạn",
        "Tự giới thiệu bản thân",
        "Tiết lộ trái phép thông tin cá nhân như địa chỉ, số điện thoại để gây hại",
        "Đăng bài khen ngợi người khác"
      ],
      correctIndex: 2,
      explanation:
        "Doxxing là hành vi nguy hiểm, có thể khiến nạn nhân bị đe dọa, khủng bố tinh thần ngoài đời thật."
    },
    {
      id: "cyber-22",
      question: "Một bạn đăng story mỉa mai, ám chỉ tên bạn mình nhưng không ghi rõ. Điều này có thể gây gì?",
      options: [
        "Không sao vì không ghi tên",
        "Khiến người bị ám chỉ tổn thương và dễ phát sinh mâu thuẫn, bạo lực học đường",
        "Chỉ là vui thôi",
        "Giúp giải tỏa stress"
      ],
      correctIndex: 1,
      explanation:
        "Dù không ghi tên, việc ám chỉ, mỉa mai công khai vẫn là một dạng bạo lực tinh thần trên mạng."
    },
    {
      id: "cyber-23",
      question: "Khi thấy clip đánh nhau trong trường được chia sẻ trên mạng, hành vi nào là ĐÚNG?",
      options: [
        "Share thêm cho nhiều người biết",
        "Tải về lưu làm kỷ niệm",
        "Báo cáo clip cho nền tảng và thông tin cho nhà trường",
        "Comment chế giễu cho vui"
      ],
      correctIndex: 2,
      explanation:
        "Chia sẻ hoặc bình luận chế giễu chỉ làm tăng tổn thương cho nạn nhân và cổ vũ bạo lực."
    },
    {
      id: "cyber-24",
      question: "Tại sao không nên tham gia các group 'bóc phốt học sinh trong trường'?",
      options: [
        "Vì group ít người",
        "Vì ở đó ít thông tin hữu ích",
        "Vì dễ kéo theo bạo lực mạng, xúc phạm, vu khống và xâm hại danh dự người khác",
        "Vì tốn dung lượng máy"
      ],
      correctIndex: 2,
      explanation:
        "Những group này dễ trở thành nơi lan truyền bạo lực mạng, làm xấu môi trường học đường."
    },
    {
      id: "cyber-25",
      question: "Một giáo viên bị học sinh cắt ghép hình ảnh, đăng lên mạng để chế giễu. Việc này vi phạm gì?",
      options: [
        "Không vi phạm gì",
        "Chỉ là trò vui",
        "Vi phạm quyền hình ảnh và làm xấu hình ảnh nhà giáo, có thể bị xử lý kỷ luật hoặc pháp luật",
        "Thể hiện sự sáng tạo"
      ],
      correctIndex: 2,
      explanation:
        "Giáo viên cũng có quyền được tôn trọng, hành vi này làm suy giảm uy tín và môi trường giáo dục lành mạnh."
    },
    {
      id: "cyber-26",
      question: "Khi bị lập nhóm chat bí mật để nói xấu, bạn nên làm gì?",
      options: [
        "Xin vào nhóm để cãi nhau",
        "Tạo nhóm khác để nói xấu lại",
        "Thu thập bằng chứng, báo người lớn/nhà trường để xử lý",
        "Im lặng chịu đựng"
      ],
      correctIndex: 2,
      explanation:
        "Việc báo người lớn không phải 'mách lẻo' mà là hành động bảo vệ bản thân và môi trường học đường."
    },
    {
      id: "cyber-27",
      question: "Lý do nào KHÔNG hợp lý khi 'ném đá' một bạn trên mạng?",
      options: [
        "Vì bạn đó ăn mặc khác lạ",
        "Vì bạn đó có quan điểm khác mình",
        "Vì nghĩ nhiều người cùng làm nên mình không sao",
        "Cả 3 lý do trên đều không hợp lý"
      ],
      correctIndex: 3,
      explanation:
        "Không có lý do nào biện minh cho việc tấn công, xúc phạm người khác trên mạng."
    },
    {
      id: "cyber-28",
      question: "Nhà trường nên làm gì để hạn chế bạo lực mạng giữa học sinh?",
      options: [
        "Làm ngơ vì 'chuyện trên mạng'",
        "Tổ chức các buổi giáo dục về ứng xử số, xây dựng quy tắc dùng mạng xã hội trong trường",
        "Cấm học sinh dùng điện thoại",
        "Chỉ nhắc nhở miệng"
      ],
      correctIndex: 1,
      explanation:
        "Giáo dục kỹ năng số và quy tắc rõ ràng giúp học sinh biết giới hạn và trách nhiệm khi dùng mạng."
    },
    {
      id: "cyber-29",
      question: "Khi bị nhận tin nhắn đe dọa, bạn KHÔNG nên làm gì?",
      options: [
        "Chụp màn hình lưu lại",
        "Chặn tài khoản gửi tin",
        "Báo bố mẹ, giáo viên hoặc cơ quan chức năng",
        "Chửi lại bằng lời lẽ nặng nề hơn"
      ],
      correctIndex: 3,
      explanation:
        "Đáp trả bằng bạo lực lời nói có thể khiến bạn cũng trở thành người vi phạm."
    },
    {
      id: "cyber-30",
      question: "Một bạn lén vào tài khoản học tập trực tuyến của người khác để đổi tên, đổi avatar 'lố bịch'. Đây là?",
      options: [
        "Trò nghịch cho vui",
        "Tăng tương tác lớp học",
        "Xâm phạm tài khoản người khác, có thể xem là hành vi bạo lực và vi phạm nội quy",
        "Sáng tạo nội dung"
      ],
      correctIndex: 2,
      explanation:
        "Dù không đánh nhau, việc xâm nhập tài khoản để làm nhục người khác vẫn là một dạng bạo lực học đường trên không gian số."
    },


  ],

  // --- CHỦ ĐỀ 2: BẠO LỰC HỌC ĐƯỜNG (SCHOOL VIOLENCE) ---
  "school-violence": [
    {
      id: "school-1",
      question:
        "Hành vi cố tình làm hỏng đồ dùng học tập của bạn là dạng bạo lực nào?",
      options: [
        "Bạo lực thể chất",
        "Bạo lực vật chất/tài sản",
        "Bạo lực tình dục",
        "Trò đùa",
      ],
      correctIndex: 1,
      explanation:
        "Hủy hoại tài sản người khác gây thiệt hại kinh tế và ức chế tinh thần cho nạn nhân.",
    },
    {
      id: "school-2",
      question:
        "Khi bị bắt nạt, tại sao nhiều bạn không dám báo giáo viên?",
      options: [
        "Sợ bị trả thù hoặc bị gọi là kẻ mách lẻo",
        "Vì thích bị bắt nạt",
        "Vì giáo viên không quan tâm",
        "Vì muốn làm anh hùng",
      ],
      correctIndex: 0,
      explanation:
        "Nỗi sợ bị trả thù là rào cản lớn nhất. Cần hiểu rằng im lặng mới là tiếp tay cho kẻ bắt nạt.",
    },
    {
      id: "school-3",
      question:
        "Hành vi gán ghép tên bạn với tên bố mẹ bạn để trêu chọc là?",
      options: ["Hài hước", "Bạo lực tinh thần (ngôn ngữ)", "Thể hiện sự thân thiết", "Sáng tạo"],
      correctIndex: 1,
      explanation:
        "Xúc phạm gia đình người khác là hành vi thiếu văn hóa và gây tổn thương tinh thần sâu sắc.",
    },
    {
      id: "school-4",
      question: "Nếu bạn vô tình làm đau bạn khác, bạn nên?",
      options: [
        "Đổ lỗi cho người khác",
        "Xin lỗi chân thành và giúp đỡ bạn",
        "Bỏ chạy",
        "Cười cợt",
      ],
      correctIndex: 1,
      explanation:
        "Xin lỗi và khắc phục hậu quả thể hiện trách nhiệm và sự tôn trọng.",
    },
    {
      id: "school-5",
      question:
        "Khu vực nào trong trường thường dễ xảy ra bắt nạt nhất?",
      options: [
        "Phòng giáo viên",
        "Nhà vệ sinh, hành lang vắng, góc khuất camera",
        "Giữa sân trường giờ chào cờ",
        "Trong lớp khi có cô giáo",
      ],
      correctIndex: 1,
      explanation:
        "Kẻ bắt nạt thường chọn những nơi khuất tầm nhìn của người lớn để hành động.",
    },
    {
      id: "school-6",
      question:
        "Một bạn nam liên tục chặn đường, kéo tóc bạn nữ dù bạn nữ đã phản đối. Đây là?",
      options: ["Tán tỉnh", "Quấy rối và bạo lực học đường", "Đùa vui", "Quan tâm"],
      correctIndex: 1,
      explanation:
        "Bất kỳ hành vi đụng chạm thân thể nào không được sự đồng thuận đều là xâm phạm/quấy rối.",
    },
    {
      id: "school-7",
      question:
        "Hậu quả lâu dài của bạo lực học đường với nạn nhân là gì?",
      options: [
        "Tự tin hơn",
        "Rối loạn lo âu, trầm cảm, giảm sút học tập",
        "Được nhiều người yêu mến",
        "Trở nên giàu có",
      ],
      correctIndex: 1,
      explanation:
        "Vết sẹo tâm lý từ bạo lực học đường có thể kéo dài đến suốt cuộc đời.",
    },
    {
      id: "school-8",
      question:
        "Bạn A sai khiến bạn B làm bài tập hộ bằng cách đe dọa sẽ đánh B. Đây là?",
      options: [
        "Hợp tác học tập",
        "Bóc lột và đe dọa",
        "Giúp đỡ nhau",
        "Kỹ năng lãnh đạo",
      ],
      correctIndex: 1,
      explanation:
        "Sử dụng vũ lực để ép buộc người khác làm theo ý mình là hành vi trấn lột/bóc lột.",
    },
    {
      id: "school-9",
      question:
        "Để phòng tránh bạo lực học đường, lớp học cần xây dựng môi trường như thế nào?",
      options: [
        "Mạnh ai nấy sống",
        "Đoàn kết, tôn trọng sự khác biệt, không bao che cái xấu",
        "Chia bè kết phái",
        "Chỉ chơi với bạn giàu",
      ],
      correctIndex: 1,
      explanation:
        "Một tập thể đoàn kết và tôn trọng lẫn nhau là 'lá chắn' tốt nhất chống lại bạo lực.",
    },
    {
      id: "school-10",
      question:
        "Thái độ nào là ĐÚNG khi thấy bạn khuyết tật bị trêu chọc?",
      options: [
        "Cười theo",
        "Đứng nhìn",
        "Lên tiếng bảo vệ và báo giáo viên",
        "Quay video đăng lên mạng",
      ],
      correctIndex: 2,
      explanation:
        "Bảo vệ người yếu thế thể hiện lòng nhân ái và sự dũng cảm.",
    },
        {
      id: "school-11",
      question: "Một nhóm bạn thường xuyên 'bắt nạt vui' một bạn trầm tính. Điều này là?",
      options: [
        "Bình thường, chỉ là đùa thôi",
        "Bạo lực tinh thần, dù người gây ra nghĩ là đùa",
        "Cách giúp bạn đó hòa đồng hơn",
        "Điều bắt buộc trong lớp"
      ],
      correctIndex: 1,
      explanation:
        "Không có ai có quyền ép người khác chịu đựng những trò 'đùa' làm họ tổn thương."
    },
    {
      id: "school-12",
      question: "Thấy bạn đánh nhau, việc KHÔNG nên làm là?",
      options: [
        "Gọi người lớn hoặc bảo vệ trường",
        "Can ngăn khi thấy an toàn",
        "Quay clip rồi đăng lên mạng",
        "Báo cho giáo viên chủ nhiệm"
      ],
      correctIndex: 2,
      explanation:
        "Quay clip và đăng lên mạng làm nặng thêm tổn thương và vi phạm quyền riêng tư."
    },
    {
      id: "school-13",
      question: "Bạn cảm thấy thầy cô thiếu công bằng với mình, bạn nên?",
      options: [
        "Lặng lẽ ghét luôn thầy cô",
        "Chửi thầm trên mạng xã hội",
        "Trao đổi riêng, góp ý một cách tôn trọng",
        "Kích động cả lớp chống lại"
      ],
      correctIndex: 2,
      explanation:
        "Giao tiếp thẳng thắn, tôn trọng là cách tốt nhất để cải thiện mối quan hệ thầy – trò."
    },
    {
      id: "school-14",
      question: "Một dạng bạo lực tinh thần tinh vi là?",
      options: [
        "Không chơi, không nói chuyện với một bạn trong thời gian dài",
        "Thi chạy bộ",
        "Chơi thể thao",
        "Học nhóm"
      ],
      correctIndex: 0,
      explanation:
        "Cô lập xã hội (tẩy chay) khiến nạn nhân cảm thấy bị bỏ rơi, mất giá trị."
    },
    {
      id: "school-15",
      question: "Ai có thể trở thành nạn nhân của bạo lực học đường?",
      options: [
        "Chỉ những bạn học yếu",
        "Chỉ những bạn khác biệt về ngoại hình",
        "Bất kỳ ai",
        "Chỉ học sinh tiểu học"
      ],
      correctIndex: 2,
      explanation:
        "Bạo lực có thể xảy ra với bất kỳ ai, không phân biệt học lực, ngoại hình hay tính cách."
    },
    {
      id: "school-16",
      question: "Phong trào 'Nói lời hay, làm việc tốt' trong lớp có tác dụng gì?",
      options: [
        "Chỉ để lấy thành tích thi đua",
        "Giúp giảm mâu thuẫn, tăng sự tôn trọng trong tập thể",
        "Khiến lớp mất thời gian",
        "Không có ý nghĩa"
      ],
      correctIndex: 1,
      explanation:
        "Văn hóa giao tiếp tích cực là nền tảng ngăn chặn bạo lực từ gốc."
    },
    {
      id: "school-17",
      question: "Khi bị bạn dọa 'Nếu mách cô thì biết tay tao', bạn nên?",
      options: [
        "Im lặng chịu đựng",
        "Chỉ kể cho bạn thân, không nói với người lớn",
        "Tìm người lớn tin cậy để báo, có thể nhờ hỗ trợ bảo vệ",
        "Bắt nạt lại cho 'công bằng'"
      ],
      correctIndex: 2,
      explanation:
        "Không ai đáng phải chịu bạo lực. Người lớn có trách nhiệm bảo vệ bạn."
    },
    {
      id: "school-18",
      question: "Việc trường tổ chức các buổi nói chuyện chuyên đề về bạo lực học đường nhằm?",
      options: [
        "Cho vui",
        "Giúp học sinh hiểu, nhận diện và biết cách phòng tránh bạo lực",
        "Làm tăng bạo lực",
        "Giảm giờ học chính khóa"
      ],
      correctIndex: 1,
      explanation:
        "Giáo dục phòng ngừa là biện pháp lâu dài và hiệu quả nhất để giảm bạo lực."
    },
        {
      id: "school-19",
      question: "Một bạn thường xuyên bị gọi bằng biệt danh liên quan đến ngoại hình (mập, lùn, đen...). Đây là?",
      options: [
        "Cách trêu cho thân",
        "Bạo lực tinh thần, xúc phạm nhân phẩm",
        "Khen ngợi gián tiếp",
        "Chuyện bình thường trong lớp"
      ],
      correctIndex: 1,
      explanation:
        "Biệt danh gắn với ngoại hình dễ khiến nạn nhân xấu hổ, tự ti và bị tổn thương lâu dài."
    },
    {
      id: "school-20",
      question: "Khi một học sinh mới chuyển trường bị tẩy chay, cô lập, điều quan trọng là?",
      options: [
        "Đứng ngoài, không liên quan",
        "Tham gia cho 'vui nhóm'",
        "Mỗi bạn trong lớp chủ động làm quen, hỗ trợ để bạn hòa nhập",
        "Đợi xem bạn đó tự thích nghi"
      ],
      correctIndex: 2,
      explanation:
        "Sự chào đón và hỗ trợ ban đầu giúp giảm nguy cơ trở thành nạn nhân bạo lực học đường."
    },
    {
      id: "school-21",
      question: "Một nhóm học sinh hay chặn cổng trường để 'đòi tiền bảo kê' của học sinh khác. Đây là?",
      options: [
        "Trò chơi kiếm tiền",
        "Hoạt động kinh doanh",
        "Hành vi trấn lột, bạo lực học đường nghiêm trọng",
        "Góp quỹ lớp"
      ],
      correctIndex: 2,
      explanation:
        "Trấn lột là hành vi bạo lực, có thể bị xử lý kỷ luật nặng hoặc truy cứu trách nhiệm hình sự."
    },
    {
      id: "school-22",
      question: "Khi giáo viên xử lý vụ đánh nhau, điều quan trọng nhất là?",
      options: [
        "Tìm bên nào 'thắng, thua'",
        "Đổ lỗi cho một phía ngay",
        "Lắng nghe cả hai bên, nhân chứng, xem xét bối cảnh trước khi kết luận",
        "Giữ im lặng để tránh rắc rối"
      ],
      correctIndex: 2,
      explanation:
        "Tiếp cận công bằng, khách quan giúp xử lý đúng bản chất mâu thuẫn và giáo dục hai bên."
    },
    {
      id: "school-23",
      question: "Bạn A bị ép phải cho bạn B chép bài kiểm tra, nếu không sẽ bị 'đánh sau trường'. Đây là dạng?",
      options: [
        "Giúp đỡ nhau học tập",
        "Trao đổi công bằng",
        "Bạo lực, ép buộc và gian lận",
        "Tinh thần tập thể"
      ],
      correctIndex: 2,
      explanation:
        "Dùng bạo lực để ép buộc người khác gian lận là hành vi sai ở cả hai mặt đạo đức và nội quy."
    },
    {
      id: "school-24",
      question: "Một số bạn chọn quay clip đánh nhau để 'câu view'. Điều này gây hại gì?",
      options: [
        "Giải trí cho mọi người",
        "Giúp trường nổi tiếng",
        "Làm nạn nhân xấu hổ, bị gắn nhãn lâu dài, kích thích người khác bắt chước",
        "Không ảnh hưởng gì"
      ],
      correctIndex: 2,
      explanation:
        "Việc lan truyền clip bạo lực khiến nạn nhân phải chịu 'bạo lực lần 2' trên không gian mạng."
    },
    {
      id: "school-25",
      question: "Một bạn hay 'giật' nón, kéo áo, đùa mạnh với người khác. Nếu người kia khó chịu, đây là?",
      options: [
        "Bình thường, bạn bè thân thì vậy",
        "Chỉ là đùa",
        "Xâm phạm thân thể, bạo lực thể chất mức độ nhẹ",
        "Thể hiện tình cảm"
      ],
      correctIndex: 2,
      explanation:
        "Đụng chạm cơ thể không được đồng ý vẫn là bạo lực, dù người gây ra có nghĩ là đùa."
    },
    {
      id: "school-26",
      question: "Lớp trưởng/lớp phó nên làm gì khi biết trong lớp có bạn bị bắt nạt?",
      options: [
        "Để kệ vì sợ liên lụy",
        "Đứng về phía nhóm mạnh hơn",
        "Báo giáo viên chủ nhiệm và động viên bạn bị hại",
        "Chỉ nhắc riêng thủ phạm"
      ],
      correctIndex: 2,
      explanation:
        "Cán bộ lớp có vai trò quan trọng trong việc kết nối thông tin giữa bạn bè và giáo viên."
    },
    {
      id: "school-27",
      question: "Trò 'hù dọa trong nhà vệ sinh tối' có thể dẫn đến HẬU QUẢ gì?",
      options: [
        "Chỉ là kỷ niệm vui",
        "Không sao, quên nhanh",
        "Gây ám ảnh, sợ hãi, ảnh hưởng tâm lý và niềm tin an toàn trong trường",
        "Giúp tăng can đảm"
      ],
      correctIndex: 2,
      explanation:
        "Những trò tưởng như 'vui' có thể để lại chấn thương tâm lý khó lường cho người bị hại."
    },
    {
      id: "school-28",
      question: "Trong giờ ra chơi, bạn thấy nhóm lớn đang vây một bạn nhỏ hơn, mặt rất sợ. Điều nên làm?",
      options: [
        "Giả vờ không thấy",
        "Đứng xem cho biết chuyện",
        "Rủ thêm người lớn/giáo viên, bảo vệ đến can thiệp",
        "Quay clip lại"
      ],
      correctIndex: 2,
      explanation:
        "Sự can thiệp kịp thời của người lớn giúp ngăn chặn bạo lực thể chất có thể xảy ra."
    },
    {
      id: "school-29",
      question: "Vì sao việc 'tự trừng phạt' bằng cách nhịn ăn, tự làm đau mình sau khi bị bắt nạt là nguy hiểm?",
      options: [
        "Vì sẽ bị bố mẹ mắng",
        "Vì chỉ hại sức khỏe thể chất",
        "Vì là dấu hiệu tổn thương tâm lý sâu, cần được hỗ trợ chuyên môn",
        "Vì làm bạn bè lo lắng"
      ],
      correctIndex: 2,
      explanation:
        "Đây có thể là dấu hiệu khủng hoảng tâm lý cần được phát hiện và hỗ trợ sớm."
    },
    {
      id: "school-30",
      question: "Yếu tố nào giúp giảm bạo lực học đường trong một lớp?",
      options: [
        "Mạnh ai nấy sống",
        "Giữ bí mật mọi mâu thuẫn",
        "Xây dựng nội quy lớp rõ ràng, thống nhất ủng hộ 'nói không với bạo lực'",
        "Không bao giờ báo giáo viên"
      ],
      correctIndex: 2,
      explanation:
        "Một tập thể đồng thuận 'không chấp nhận bạo lực' sẽ tạo môi trường an toàn và tôn trọng."
    },


  ],

  // --- CHỦ ĐỀ 3: LUẬT & QUYỀN (LAW & RIGHTS) ---
  "law-rights": [
    {
      id: "law-1",
      question:
        "Theo Công ước LHQ về Quyền trẻ em, trẻ em có mấy nhóm quyền cơ bản?",
      options: ["2 nhóm", "3 nhóm", "4 nhóm (Sống còn, Bảo vệ, Phát triển, Tham gia)", "5 nhóm"],
      correctIndex: 2,
      explanation:
        "4 nhóm quyền bao gồm: Quyền sống còn, Quyền được bảo vệ, Quyền phát triển và Quyền tham gia.",
    },
    {
      id: "law-2",
      question: "Số điện thoại của Cảnh sát 113 dùng trong trường hợp nào?",
      options: [
        "Tư vấn tình cảm",
        "Khẩn cấp về an ninh trật tự, đánh nhau gây thương tích",
        "Hỏi đường",
        "Báo cháy",
      ],
      correctIndex: 1,
      explanation:
        "113 là đầu số khẩn cấp khi xảy ra các vụ việc gây mất an ninh trật tự, bạo lực nghiêm trọng.",
    },
    {
      id: "law-3",
      question: "Học sinh đánh nhau gây thương tích 11% trở lên có thể bị?",
      options: [
        "Chỉ bị viết kiểm điểm",
        "Truy cứu trách nhiệm hình sự về Tội cố ý gây thương tích",
        "Xin lỗi là xong",
        "Đền tiền là xong",
      ],
      correctIndex: 1,
      explanation:
        "Thương tích từ 11% (hoặc dưới 11% nhưng dùng hung khí) đã đủ yếu tố cấu thành tội phạm hình sự.",
    },
    {
      id: "law-4",
      question: "Ai có trách nhiệm bảo vệ trẻ em khỏi bạo lực?",
      options: [
        "Chỉ bố mẹ",
        "Chỉ nhà trường",
        "Gia đình, Nhà trường, Nhà nước và toàn xã hội",
        "Chỉ công an",
      ],
      correctIndex: 2,
      explanation:
        "Bảo vệ trẻ em là trách nhiệm chung của toàn bộ cộng đồng và hệ thống chính trị.",
    },
    {
      id: "law-5",
      question: "Trẻ em có quyền 'bí mật đời sống riêng tư' không?",
      options: [
        "Không, trẻ em không có quyền này",
        "Có, được pháp luật bảo vệ",
        "Chỉ khi 18 tuổi",
        "Tùy bố mẹ quyết định",
      ],
      correctIndex: 1,
      explanation:
        "Luật Trẻ em 2016 quy định trẻ em có quyền được bảo vệ bí mật đời sống riêng tư (thư tín, hình ảnh...).",
    },
    {
      id: "law-6",
      question: "Giáo viên có được phép đánh học sinh không?",
      options: [
        "Được, nếu học sinh hư",
        "Tuyệt đối không, đó là vi phạm đạo đức và pháp luật",
        "Được đánh nhẹ",
        "Được dùng thước kẻ",
      ],
      correctIndex: 1,
      explanation:
        "Mọi hành vi xâm phạm thân thể học sinh đều bị nghiêm cấm trong môi trường giáo dục.",
    },
    {
      id: "law-7",
      question: "Quyền 'được tham gia' của trẻ em nghĩa là gì?",
      options: [
        "Được đi chơi thoải mái",
        "Được bày tỏ ý kiến, nguyện vọng về các vấn đề liên quan đến trẻ em",
        "Được tham gia đánh nhau",
        "Được nghỉ học",
      ],
      correctIndex: 1,
      explanation:
        "Trẻ em có quyền lên tiếng và ý kiến của các em phải được người lớn tôn trọng, xem xét.",
    },
    {
      id: "law-8",
      question: "Khi bị xâm hại tình dục, thời hạn tố cáo là bao lâu?",
      options: ["1 tháng", "1 năm", "Thời hiệu rất dài, hãy tố cáo ngay khi có thể", "Hết năm học"],
      correctIndex: 2,
      explanation:
        "Pháp luật quy định thời hiệu khởi kiện các vụ án xâm hại là rất dài, đừng bao giờ nghĩ là 'đã quá muộn'.",
    },
    {
      id: "law-9",
      question:
        "Cơ quan nào ở trường học chịu trách nhiệm tư vấn tâm lý và giải quyết bạo lực?",
      options: [
        "Phòng Tổ chức",
        "Phòng Tư vấn tâm lý học đường / Ban giám hiệu / Đoàn đội",
        "Phòng Kế toán",
        "Căng tin",
      ],
      correctIndex: 1,
      explanation:
        "Các trường học hiện nay đều có Tổ tư vấn tâm lý hoặc Ban giám hiệu chịu trách nhiệm vấn đề này.",
    },
    {
      id: "law-10",
      question:
        "Việc lan truyền tin đồn thất thiệt ảnh hưởng đến uy tín người khác vi phạm quyền gì?",
      options: [
        "Quyền được bảo vệ danh dự, nhân phẩm",
        "Quyền tự do ngôn luận",
        "Quyền học tập",
        "Quyền vui chơi",
      ],
      correctIndex: 0,
      explanation:
        "Tự do ngôn luận không bao gồm việc bịa đặt, vu khống làm tổn hại người khác.",
    },
        {
      id: "law-11",
      question: "Luật Trẻ em 2016 áp dụng cho độ tuổi nào?",
      options: [
        "Dưới 14 tuổi",
        "Dưới 16 tuổi",
        "Dưới 18 tuổi",
        "Dưới 21 tuổi"
      ],
      correctIndex: 2,
      explanation:
        "Trẻ em theo pháp luật Việt Nam là người dưới 16 tuổi, nhưng nhiều chính sách bảo vệ áp dụng đến dưới 18 tuổi; cần đọc kỹ từng luật chuyên ngành."
    },
    {
      id: "law-12",
      question: "Khi chứng kiến trẻ em bị bạo hành, người dân có nghĩa vụ gì?",
      options: [
        "Không liên quan nên kệ",
        "Quay clip đăng mạng",
        "Thông báo ngay cho cơ quan, tổ chức có thẩm quyền hoặc tổng đài bảo vệ trẻ em",
        "Chờ xem có ai xử lý không"
      ],
      correctIndex: 2,
      explanation:
        "Luật quy định trách nhiệm báo tin khi phát hiện hành vi xâm hại trẻ em."
    },
    {
      id: "law-13",
      question: "Số điện thoại Tổng đài Quốc gia bảo vệ trẻ em là?",
      options: ["111", "113", "115", "1900 1000"],
      correctIndex: 0,
      explanation:
        "111 là đầu số miễn phí, hoạt động 24/7 để tiếp nhận, tư vấn và hỗ trợ trẻ em."
    },
    {
      id: "law-14",
      question: "Hành vi ép buộc học sinh nộp tiền 'quỹ lớp' vượt quy định có thể là?",
      options: [
        "Việc bình thường",
        "Huy động tự nguyện",
        "Lạm thu, trái quy định nếu không minh bạch và không tự nguyện",
        "Chuyện nhỏ"
      ],
      correctIndex: 2,
      explanation:
        "Mọi khoản thu trong trường học phải đúng quy định và dựa trên sự tự nguyện, minh bạch."
    },
    {
      id: "law-15",
      question: "Học sinh có quyền khiếu nại/kiến nghị với nhà trường không?",
      options: [
        "Không, chỉ phụ huynh mới được",
        "Có, thông qua đơn kiến nghị hoặc gặp trực tiếp Ban giám hiệu, giáo viên chủ nhiệm",
        "Chỉ khi 18 tuổi",
        "Chỉ khi có luật sư"
      ],
      correctIndex: 1,
      explanation:
        "Học sinh có tiếng nói trong môi trường học đường và có quyền phản ánh, kiến nghị hợp pháp."
    },
    {
      id: "law-16",
      question: "Hành vi tung clip riêng tư của người khác để tống tiền có thể bị xử lý về tội gì?",
      options: [
        "Tội trộm cắp",
        "Tội cưỡng đoạt tài sản",
        "Tội đánh bạc",
        "Không phải tội"
      ],
      correctIndex: 1,
      explanation:
        "Đe dọa sẽ tung tin/clip xấu để buộc người khác đưa tiền là hành vi cưỡng đoạt tài sản."
    },
    {
      id: "law-17",
      question: "Nhà trường phải làm gì khi tiếp nhận thông tin học sinh bị bạo lực?",
      options: [
        "Giữ kín, không xử lý",
        "Đùn đẩy trách nhiệm",
        "Xác minh, có biện pháp bảo vệ khẩn cấp và báo cơ quan chức năng nếu cần",
        "Chỉ khuyên hai bên tự giải quyết"
      ],
      correctIndex: 2,
      explanation:
        "Trường học là nơi chịu trách nhiệm chính trong việc bảo vệ học sinh trong phạm vi quản lý."
    },
    {
      id: "law-18",
      question: "Việc đăng thông tin, hình ảnh trẻ em lên mạng cần lưu ý gì?",
      options: [
        "Không cần xin phép ai",
        "Chỉ cần xin phép bạn bè",
        "Cần sự đồng ý của cha mẹ/người giám hộ và tránh lộ thông tin nhạy cảm",
        "Càng đăng nhiều càng tốt"
      ],
      correctIndex: 2,
      explanation:
        "Trẻ em có quyền được bảo vệ hình ảnh; người lớn phải cân nhắc kỹ trước khi đăng tải."
    },
        {
      id: "law-19",
      question: "Học sinh 15 tuổi tham gia đánh bạn gây thương tích nặng có thể bị xử lý thế nào?",
      options: [
        "Chỉ viết kiểm điểm",
        "Không bị xử lý vì chưa đủ 18 tuổi",
        "Có thể bị xử lý hình sự tùy mức độ, hoặc xử lý hành chính/kỷ luật của nhà trường",
        "Chỉ mời phụ huynh lên làm việc"
      ],
      correctIndex: 2,
      explanation:
        "Người từ đủ 14 tuổi đã có thể bị xử lý hình sự đối với một số tội nghiêm trọng, ngoài ra còn có các biện pháp giáo dục, kỷ luật."
    },
    {
      id: "law-20",
      question: "Cha mẹ đánh con bằng roi, để lại nhiều vết bầm, được xem là?",
      options: [
        "Dạy con cho nên người",
        "Chuyện riêng trong gia đình",
        "Hành vi bạo lực gia đình, xâm hại trẻ em",
        "Truyền thống ông bà để lại"
      ],
      correctIndex: 2,
      explanation:
        "Pháp luật Việt Nam nghiêm cấm bạo lực gia đình, kể cả với con ruột."
    },
    {
      id: "law-21",
      question: "Việc nhà trường công khai điểm kém và đọc tên học sinh trước toàn trường có thể vi phạm quyền nào?",
      options: [
        "Quyền vui chơi",
        "Quyền tự do ngôn luận",
        "Quyền được tôn trọng danh dự, nhân phẩm",
        "Không vi phạm gì"
      ],
      correctIndex: 2,
      explanation:
        "Việc bêu tên, làm nhục công khai có thể làm tổn hại danh dự và tinh thần của học sinh."
    },
    {
      id: "law-22",
      question: "Theo Luật Trẻ em, nguyên tắc xử lý vụ việc bạo lực với trẻ em là?",
      options: [
        "Ưu tiên bảo vệ người lớn",
        "Giữ bí mật, không cho trẻ tham gia ý kiến",
        "Đảm bảo lợi ích tốt nhất của trẻ em",
        "Chỉ dựa vào ý kiến bố mẹ"
      ],
      correctIndex: 2,
      explanation:
        "Nguyên tắc 'lợi ích tốt nhất của trẻ em' là kim chỉ nam trong mọi quyết định liên quan đến trẻ."
    },
    {
      id: "law-23",
      question: "Hành vi giáo viên mắng chửi, nhục mạ học sinh trước lớp là?",
      options: [
        "Bình thường, để răn đe",
        "Biện pháp giáo dục đặc biệt",
        "Hành vi bạo lực tinh thần, vi phạm quy tắc nghề nghiệp",
        "Tự do ngôn luận"
      ],
      correctIndex: 2,
      explanation:
        "Giáo viên không được dùng lời lẽ xúc phạm học sinh, nhất là trước tập thể."
    },
    {
      id: "law-24",
      question: "Khi bị quay lén trong nhà vệ sinh hoặc phòng thay đồ, bạn nên làm gì?",
      options: [
        "Xóa đi cho xong chuyện",
        "Giữ kín vì xấu hổ",
        "Báo ngay cho bố mẹ, nhà trường và cơ quan chức năng để kịp thời thu giữ thiết bị, ngăn phát tán",
        "Tự tìm và đánh người đó"
      ],
      correctIndex: 2,
      explanation:
        "Hành vi quay lén là xâm hại nghiêm trọng, cần xử lý khẩn cấp để bảo vệ nạn nhân."
    },
    {
      id: "law-25",
      question: "Học sinh có quyền tham gia xây dựng nội quy lớp, nội quy trường không?",
      options: [
        "Không, chỉ người lớn mới được",
        "Có, thông qua góp ý, họp lớp, họp đại diện học sinh",
        "Chỉ học sinh giỏi mới được",
        "Chỉ bí thư chi đoàn được"
      ],
      correctIndex: 1,
      explanation:
        "Quyền tham gia giúp học sinh thấy trách nhiệm và chủ động hơn trong việc giữ gìn môi trường an toàn."
    },
    {
      id: "law-26",
      question: "Việc lan truyền thông tin sai sự thật rằng một bạn 'ăn cắp đồ' khi chưa có bằng chứng có thể cấu thành hành vi gì?",
      options: [
        "Nói cho vui",
        "Cảnh báo cộng đồng",
        "Vu khống, xúc phạm danh dự người khác",
        "Không sao nếu nói nhỏ"
      ],
      correctIndex: 2,
      explanation:
        "Vu khống có thể bị xử lý hành chính hoặc hình sự tùy mức độ hậu quả."
    },
    {
      id: "law-27",
      question: "Tại sao cần xin phép khi đăng ảnh tập thể lớp có mặt bạn khác lên mạng?",
      options: [
        "Vì quy định của mạng xã hội",
        "Để ảnh đẹp hơn",
        "Vì mỗi người có quyền với hình ảnh của mình và có thể không muốn xuất hiện công khai",
        "Để tăng tương tác"
      ],
      correctIndex: 2,
      explanation:
        "Quyền hình ảnh thuộc về mỗi cá nhân, nhất là với học sinh, cần được tôn trọng."
    },
    {
      id: "law-28",
      question: "Nhà trường có trách nhiệm gì khi phát hiện giáo viên bạo hành học sinh?",
      options: [
        "Bao che để giữ hình ảnh",
        "Nhắc nhở nhẹ",
        "Xác minh, tạm dừng hành vi, bảo vệ học sinh và báo cáo cơ quan quản lý",
        "Chuyển lớp học sinh đó"
      ],
      correctIndex: 2,
      explanation:
        "Bảo vệ học sinh là ưu tiên, không được bao che cho hành vi bạo lực."
    },
    {
      id: "law-29",
      question: "Học sinh bị bắt nạt có quyền yêu cầu được chuyển lớp, chuyển chỗ ngồi không?",
      options: [
        "Không, phải chịu đựng",
        "Có, có thể đề nghị với giáo viên, Ban giám hiệu nếu cảm thấy không an toàn",
        "Chỉ khi có giấy của công an",
        "Chỉ khi bố mẹ trực tiếp yêu cầu"
      ],
      correctIndex: 1,
      explanation:
        "Môi trường học tập an toàn là quyền của học sinh, có thể đề nghị thay đổi để bảo vệ bản thân."
    },
    {
      id: "law-30",
      question: "Tại sao phải dạy học sinh sớm về quyền và nghĩa vụ của mình liên quan đến bạo lực học đường?",
      options: [
        "Để học sinh cãi lại người lớn",
        "Để học sinh biết tự bênh vực và không xâm phạm quyền người khác",
        "Để giảm giờ học văn hóa",
        "Để học sinh làm luật sư"
      ],
      correctIndex: 1,
      explanation:
        "Hiểu quyền – nghĩa vụ giúp học sinh nhận diện bạo lực, dám lên tiếng và tôn trọng người khác."
    },


  ],

  // --- CHỦ ĐỀ 4: SỨC KHỎE TINH THẦN (MENTAL HEALTH) ---
  "mental-health": [
    {
      id: "mental-1",
      question: "Sức khỏe tinh thần tốt là gì?",
      options: [
        "Lúc nào cũng cười",
        "Trạng thái thoải mái, có khả năng đối mặt với áp lực cuộc sống",
        "Không bao giờ buồn",
        "Giàu có",
      ],
      correctIndex: 1,
      explanation:
        "Khỏe mạnh tinh thần không có nghĩa là không bao giờ buồn, mà là khả năng cân bằng và vượt qua khó khăn.",
    },
    {
      id: "mental-2",
      question: "FOMO (Fear of Missing Out) là hội chứng gì?",
      options: [
        "Sợ ma",
        "Sợ bị bỏ lỡ, luôn lo lắng người khác vui vẻ hơn mình trên mạng xã hội",
        "Sợ đi học muộn",
        "Sợ độ cao",
      ],
      correctIndex: 1,
      explanation:
        "FOMO gây lo âu, khiến bạn dán mắt vào điện thoại và so sánh bản thân với người khác.",
    },
    {
      id: "mental-3",
      question: "Burnout (kiệt sức) trong học tập có dấu hiệu gì?",
      options: [
        "Hào hứng đến trường",
        "Mệt mỏi triền miên, mất động lực, cảm thấy trống rỗng",
        "Ăn nhiều hơn",
        "Ngủ ít đi vì vui",
      ],
      correctIndex: 1,
      explanation:
        "Kiệt sức là trạng thái căng thẳng kéo dài khiến bạn không còn năng lượng để tiếp tục.",
    },
    {
      id: "mental-4",
      question: "Kỹ thuật 'Hít thở sâu' có tác dụng gì khi tức giận?",
      options: [
        "Làm phổi to ra",
        "Giúp cung cấp oxy não, giảm nhịp tim và bình tĩnh lại",
        "Không có tác dụng gì",
        "Làm tốn thời gian",
      ],
      correctIndex: 1,
      explanation:
        "Hít sâu - thở chậm là cách nhanh nhất để gửi tín hiệu 'an toàn' đến hệ thần kinh.",
    },
    {
      id: "mental-5",
      question: "Nguyên nhân nào dẫn đến stress ở học sinh?",
      options: [
        "Áp lực điểm số, kỳ vọng gia đình, quan hệ bạn bè",
        "Được đi chơi nhiều",
        "Ăn uống đầy đủ",
        "Ngủ đủ giấc",
      ],
      correctIndex: 0,
      explanation:
        "Áp lực đồng trang lứa và kỳ vọng từ người lớn là những nguyên nhân hàng đầu.",
    },
    {
      id: "mental-6",
      question:
        "Khi bạn cảm thấy buồn chán kéo dài trên 2 tuần, bạn nên?",
      options: [
        "Tự chịu đựng",
        "Đi gặp bác sĩ tâm lý hoặc chuyên gia tư vấn",
        "Nghỉ học đi chơi",
        "Uống thuốc ngủ",
      ],
      correctIndex: 1,
      explanation:
        "Buồn chán kéo dài trên 2 tuần có thể là dấu hiệu lâm sàng của trầm cảm, cần thăm khám chuyên môn.",
    },
    {
      id: "mental-7",
      question:
        "Một cách lành mạnh để giải tỏa cảm xúc tiêu cực là?",
      options: [
        "Đập phá đồ đạc",
        "Viết nhật ký, vẽ tranh, chơi thể thao",
        "Mắng chửi người khác",
        "Ăn vô độ",
      ],
      correctIndex: 1,
      explanation:
        "Chuyển hóa năng lượng tiêu cực vào các hoạt động sáng tạo hoặc vận động là cơ chế phòng vệ tích cực.",
    },
    {
      id: "mental-8",
      question: "Toxic Positivity (Tích cực độc hại) là gì?",
      options: [
        "Luôn vui vẻ",
        "Ép buộc bản thân/người khác phải vui vẻ, phủ nhận mọi cảm xúc tiêu cực",
        "Sống tích cực",
        "Lạc quan tếu",
      ],
      correctIndex: 1,
      explanation:
        `Phủ nhận nỗi buồn ("Vui lên đi, có gì đâu") khiến người nghe cảm thấy bị phớt lờ và cô đơn hơn.`,
    },
    {
      id: "mental-9",
      question: "Giấc ngủ ảnh hưởng thế nào đến tinh thần?",
      options: [
        "Không liên quan",
        "Thiếu ngủ gây cáu gắt, giảm trí nhớ và khả năng tập trung",
        "Ngủ ít giúp thông minh hơn",
        "Chỉ ảnh hưởng chiều cao",
      ],
      correctIndex: 1,
      explanation:
        "Giấc ngủ là lúc não bộ hồi phục và xử lý cảm xúc. Thiếu ngủ là kẻ thù của sức khỏe tâm thần.",
    },
    {
      id: "mental-10",
      question: "Resilience (Khả năng phục hồi) là gì?",
      options: [
        "Không bao giờ vấp ngã",
        "Khả năng bật dậy mạnh mẽ sau những thất bại và tổn thương",
        "Sự lì lợm",
        "Sức khỏe cơ bắp",
      ],
      correctIndex: 1,
      explanation:
        "Đây là kỹ năng quan trọng nhất để vượt qua nghịch cảnh trong cuộc sống.",
    },
        {
      id: "mental-11",
      question: "Khi bạn bè tâm sự chuyện buồn, điều quan trọng nhất là?",
      options: [
        "Cho lời khuyên ngay lập tức",
        "So sánh với chuyện của mình",
        "Lắng nghe trọn vẹn và tôn trọng cảm xúc của bạn",
        "Bảo 'Chuyện có gì đâu'"
      ],
      correctIndex: 2,
      explanation:
        "Được lắng nghe thực sự là bước đầu tiên giúp người đang buồn cảm thấy bớt cô đơn."
    },
    {
      id: "mental-12",
      question: "Thói quen nào giúp cải thiện sức khỏe tinh thần?",
      options: [
        "Thức khuya lướt mạng mỗi ngày",
        "Vận động thể thao, ngủ đủ, ăn uống lành mạnh",
        "Ăn đồ ngọt liên tục",
        "Cách ly hoàn toàn với mọi người"
      ],
      correctIndex: 1,
      explanation:
        "Sức khỏe thể chất và tinh thần liên quan chặt chẽ với nhau."
    },
    {
      id: "mental-13",
      question: "Khi bị điểm kém, suy nghĩ lành mạnh là?",
      options: [
        "Mình vô dụng, không làm được gì",
        "Mình thất bại, không cần cố nữa",
        "Đây là tín hiệu để mình xem lại cách học và cố gắng hơn",
        "Đổ lỗi cho giáo viên"
      ],
      correctIndex: 2,
      explanation:
        "Tư duy phát triển (growth mindset) xem thất bại là cơ hội để học hỏi, không phải cái mác suốt đời."
    },
    {
      id: "mental-14",
      question: "Việc ghi nhật ký cảm xúc giúp gì?",
      options: [
        "Làm tốn thời gian",
        "Khiến cảm xúc tiêu cực mạnh hơn",
        "Giúp nhận diện cảm xúc, hiểu nguyên nhân và tìm cách xử lý",
        "Không có tác dụng gì"
      ],
      correctIndex: 2,
      explanation:
        "Viết ra giúp bạn tách mình khỏi cảm xúc, quan sát chúng rõ ràng hơn."
    },
    {
      id: "mental-15",
      question: "Dấu hiệu cảnh báo sớm về ý nghĩ tự hại bản thân là?",
      options: [
        "Đột ngột vui vẻ",
        "Thường xuyên nói 'Sống chán quá', 'Ước gì biến mất', thu mình, tặng hết đồ",
        "Ăn ngon hơn",
        "Thích chơi thể thao"
      ],
      correctIndex: 1,
      explanation:
        "Những tín hiệu này cần được người lớn chú ý và hỗ trợ kịp thời."
    },
    {
      id: "mental-16",
      question: "Khi cảm xúc quá tải, việc 'tạm nghỉ số hóa' nghĩa là?",
      options: [
        "Tắt toàn bộ thiết bị kết nối trong một khoảng thời gian",
        "Xóa hết tài khoản mạng xã hội",
        "Không nói chuyện với ai",
        "Chơi game nhiều hơn"
      ],
      correctIndex: 0,
      explanation:
        "Giảm kích thích từ mạng xã hội giúp não có không gian để nghỉ ngơi và hồi phục."
    },
    {
      id: "mental-17",
      question: "Bạn nên tìm đến ai khi cảm thấy tâm lý bất ổn kéo dài?",
      options: [
        "Tự giữ trong lòng",
        "Chỉ kể với người lạ trên mạng",
        "Người thân tin cậy, thầy cô, chuyên gia tâm lý hoặc tổng đài tư vấn",
        "Không kể với ai"
      ],
      correctIndex: 2,
      explanation:
        "Kết nối với người hỗ trợ chuyên môn giúp bạn được đánh giá và hỗ trợ đúng cách."
    },
    {
      id: "mental-18",
      question: "Khi thấy bạn mình có dấu hiệu trầm cảm, điều nên làm là?",
      options: [
        "Trêu chọc cho bạn vui",
        "Bảo 'Đừng suy nghĩ nữa'",
        "Ở bên cạnh, khuyến khích bạn tìm sự giúp đỡ chuyên nghiệp",
        "Bỏ mặc vì 'ai rồi cũng ổn'"
      ],
      correctIndex: 2,
      explanation:
        "Sự hiện diện và khuyến khích tìm hỗ trợ lành mạnh có thể cứu lấy một cuộc đời."
    },
        {
      id: "mental-19",
      question: "Học sinh bị bắt nạt kéo dài dễ có cảm giác gì?",
      options: [
        "Tự tin hơn",
        "Bị cô lập, vô giá trị, không ai hiểu mình",
        "Muốn đi học nhiều hơn",
        "Không ảnh hưởng gì"
      ],
      correctIndex: 1,
      explanation:
        "Cảm giác bị cô lập, vô giá trị là dấu hiệu tổn thương tinh thần nghiêm trọng."
    },
    {
      id: "mental-20",
      question: "Dấu hiệu nào cho thấy một bạn có thể đang chịu bạo lực học đường?",
      options: [
        "Thường xuyên vui vẻ trong lớp",
        "Đột ngột ít nói, hay nghỉ học, sợ đến trường",
        "Học giỏi hơn",
        "Đăng nhiều ảnh đi chơi"
      ],
      correctIndex: 1,
      explanation:
        "Ngại đến trường, thu mình, hay than mệt là những tín hiệu cần được để ý."
    },
    {
      id: "mental-21",
      question: "Khi bị nói xấu, bêu rếu trên mạng, cảm xúc thường gặp là?",
      options: [
        "Tự hào",
        "Thích thú",
        "Xấu hổ, tức giận, buồn chán, lo sợ",
        "Không ảnh hưởng gì"
      ],
      correctIndex: 2,
      explanation:
        "Bạo lực tinh thần làm tổn thương sâu sắc, có thể dẫn đến trầm cảm nếu không được hỗ trợ."
    },
    {
      id: "mental-22",
      question: "Một bạn vừa bị đánh trong trường, sau đó hay giật mình, ác mộng về sự việc. Đây có thể là?",
      options: [
        "Chuyện bình thường",
        "Tâm lý yếu",
        "Phản ứng sang chấn (stress sau sang chấn)",
        "Giả vờ"
      ],
      correctIndex: 2,
      explanation:
        "Sau một sự cố bạo lực nghiêm trọng, phản ứng sang chấn là phổ biến và cần được hỗ trợ."
    },
    {
      id: "mental-23",
      question: "Bạn có thể giúp một nạn nhân bị bắt nạt bằng cách nào?",
      options: [
        "Bảo 'đừng suy nghĩ nữa' rồi bỏ đi",
        "Không chơi với bạn đó để khỏi liên lụy",
        "Lắng nghe, tin tưởng, đi cùng bạn khi báo người lớn",
        "Khuyên im lặng cho yên chuyện"
      ],
      correctIndex: 2,
      explanation:
        "Sự đồng hành và tin tưởng giúp nạn nhân cảm thấy không đơn độc và dám lên tiếng."
    },
    {
      id: "mental-24",
      question: "Tự trách bản thân vì bị bắt nạt (nghĩ rằng 'do mình kém cỏi') là?",
      options: [
        "Suy nghĩ đúng",
        "Dấu hiệu nạn nhân đang đổ lỗi cho bản thân, cần được hỗ trợ",
        "Cách để mạnh mẽ hơn",
        "Không liên quan sức khỏe tinh thần"
      ],
      correctIndex: 1,
      explanation:
        "Không ai xứng đáng bị bạo lực. Nạn nhân cần được nhắc rằng lỗi thuộc về người gây bạo lực."
    },
    {
      id: "mental-25",
      question: "Hoạt động nhóm về 'nói không với bạo lực' giúp gì cho sức khỏe tinh thần học sinh?",
      options: [
        "Làm mất giờ học",
        "Khiến học sinh mệt hơn",
        "Tăng cảm giác được bảo vệ, gắn kết, giảm cô đơn",
        "Không tác dụng"
      ],
      correctIndex: 2,
      explanation:
        "Khi tập thể cùng lên tiếng chống bạo lực, mỗi cá nhân sẽ cảm thấy an toàn hơn."
    },
    {
      id: "mental-26",
      question: "Một bạn sau khi bị bóc phốt oan trên mạng, không muốn dùng mạng xã hội nữa. Điều này cho thấy?",
      options: [
        "Bạn ấy 'yếu đuối'",
        "Bạn ấy 'chảnh'",
        "Bạn ấy đang cố bảo vệ bản thân khỏi tác nhân gây tổn thương",
        "Không bình thường"
      ],
      correctIndex: 2,
      explanation:
        "Tránh xa môi trường gây tổn thương là phản ứng tự vệ, nhưng vẫn cần hỗ trợ tâm lý lâu dài."
    },
    {
      id: "mental-27",
      question: "Nhà trường có thể hỗ trợ sức khỏe tinh thần học sinh bị bạo lực bằng cách?",
      options: [
        "Chỉ phạt thủ phạm",
        "Không nhắc lại chuyện cũ",
        "Tổ chức tư vấn tâm lý, kết nối phụ huynh, theo dõi sự thích nghi của học sinh",
        "Chuyển trường nạn nhân"
      ],
      correctIndex: 2,
      explanation:
        "Hỗ trợ tâm lý là bước quan trọng không kém việc xử lý kỷ luật người gây bạo lực."
    },
    {
      id: "mental-28",
      question: "Việc tham gia câu lạc bộ, hoạt động ngoại khóa lành mạnh giúp gì cho học sinh từng là nạn nhân bạo lực?",
      options: [
        "Làm tốn thời gian",
        "Khiến các bạn khác ghét hơn",
        "Tăng mạng lưới bạn bè tích cực, lấy lại sự tự tin",
        "Không có tác dụng"
      ],
      correctIndex: 2,
      explanation:
        "Kết nối với các nhóm tích cực giúp nạn nhân cảm nhận lại giá trị bản thân."
    },
    {
      id: "mental-29",
      question: "Bạn bè trêu chọc liên tục về điểm số kém có thể dẫn đến?",
      options: [
        "Động lực học hơn",
        "Sự cố gắng bền vững",
        "Căng thẳng, xấu hổ, ngại chia sẻ khó khăn học tập",
        "Không ảnh hưởng"
      ],
      correctIndex: 2,
      explanation:
        "Bình luận tiêu cực về học tập dễ làm học sinh tự ti và sợ thất bại."
    },
    {
      id: "mental-30",
      question: "Thông điệp quan trọng nhất đối với một bạn bị bạo lực học đường là?",
      options: [
        "'Đừng nói với ai, tự vượt qua đi'",
        "'Do cậu quá yếu thôi'",
        "'Cậu không có lỗi, và cậu xứng đáng được bảo vệ, được giúp đỡ'",
        "'Cố chịu đi, ai cũng từng bị'"
      ],
      correctIndex: 2,
      explanation:
        "Khẳng định giá trị của nạn nhân và khuyến khích tìm hỗ trợ là bước then chốt để phục hồi."
    },


  ],

  // --- CHỦ ĐỀ 5: KỸ NĂNG GIAO TIẾP (COMMUNICATION) ---
  communication: [
    {
      id: "comm-1",
      question: "Giao tiếp phi ngôn ngữ bao gồm?",
      options: ["Lời nói", "Ánh mắt, cử chỉ, tư thế, giọng điệu", "Tin nhắn văn bản", "Email"],
      correctIndex: 1,
      explanation:
        "Phần lớn thông điệp được truyền tải qua cơ thể và giọng điệu chứ không phải từ ngữ.",
    },
    {
      id: "comm-2",
      question: "Kỹ năng 'Lắng nghe tích cực' là gì?",
      options: [
        "Nghe rồi để đó",
        "Tập trung hoàn toàn, gật đầu, đặt câu hỏi để hiểu rõ ý người nói",
        "Vừa nghe vừa bấm điện thoại",
        "Ngắt lời để đưa ra lời khuyên ngay",
      ],
      correctIndex: 1,
      explanation:
        "Lắng nghe tích cực thể hiện sự tôn trọng và mong muốn thấu hiểu đối phương.",
    },
    {
      id: "comm-3",
      question:
        "Khi muốn từ chối lời rủ rê trốn học, bạn nên nói thế nào (Kỹ năng từ chối)?",
      options: [
        "Nói 'Không' dứt khoát kèm lý do ngắn gọn",
        "Ấp úng không dám nói",
        "Nói dối quanh co",
        "Đi theo rồi trốn về",
      ],
      correctIndex: 0,
      explanation:
        "Sự quyết đoán giúp bạn giữ vững lập trường mà không cần thô lỗ.",
    },
    {
      id: "comm-4",
      question: "Thông điệp 'Tôi' (I-message) có cấu trúc thế nào?",
      options: [
        "Mày làm sai rồi!",
        "Tôi cảm thấy... khi... bởi vì...",
        "Tại sao bạn lại làm thế?",
        "Bạn thật là tồi tệ",
      ],
      correctIndex: 1,
      explanation:
        "Thông điệp 'Tôi' tập trung vào cảm xúc của bản thân thay vì đổ lỗi, giúp giảm sự phòng thủ của đối phương.",
    },
    {
      id: "comm-5",
      question:
        "Để góp ý cho bạn mà không làm bạn tự ái, ta nên dùng phương pháp nào?",
      options: [
        "Chê bai thẳng thừng trước lớp",
        "Khen trước, góp ý sau, rồi kết thúc bằng lời động viên (Sandwich)",
        "Nói xấu sau lưng",
        "Viết thư nặc danh",
      ],
      correctIndex: 1,
      explanation:
        "Phương pháp Sandwich (Khen - Góp ý - Khen) giúp lời phê bình dễ được chấp nhận hơn.",
    },
    {
      id: "comm-6",
      question: "Khi bạn bè đang giận dữ, điều KHÔNG nên làm là?",
      options: [
        "Lắng nghe",
        "Bảo bạn 'Bình tĩnh đi, chuyện nhỏ mà'",
        "Chờ bạn nguôi giận",
        "Hỏi thăm nhẹ nhàng",
      ],
      correctIndex: 1,
      explanation:
        "Câu nói 'bình tĩnh đi' thường phản tác dụng, khiến người nghe cảm thấy cảm xúc của mình bị coi thường.",
    },
    {
      id: "comm-7",
      question: "Giao tiếp trên mạng (Netiquette) cần lưu ý gì?",
      options: [
        "Viết HOA TOÀN BỘ để gây chú ý",
        "Tôn trọng, không spam, dùng ngôn từ lịch sự",
        "Gửi tin nhắn lúc nửa đêm",
        "Thêm người lạ vào nhóm chat",
      ],
      correctIndex: 1,
      explanation:
        "Viết hoa toàn bộ được coi là đang la hét. Cần giữ phép lịch sự tối thiểu trên môi trường số.",
    },
    {
      id: "comm-8",
      question: "Biểu hiện của người giao tiếp thụ động là?",
      options: [
        "Nói to, rõ ràng",
        "Không dám nhìn vào mắt, giọng nhỏ, luôn đồng ý dù không muốn",
        "Cắt ngang lời người khác",
        "Dùng tay chân múa may",
      ],
      correctIndex: 1,
      explanation:
        "Người thụ động thường để quyền lợi của mình bị xâm phạm vì sợ xung đột.",
    },
    {
      id: "comm-9",
      question:
        "Để bắt chuyện với bạn mới, chủ đề nào là an toàn nhất?",
      options: [
        "Hỏi về điểm số, gia cảnh",
        "Sở thích chung (nhạc, phim, game), bài học",
        "Chê bai quần áo",
        "Hỏi bí mật đời tư",
      ],
      correctIndex: 1,
      explanation:
        "Sở thích chung là cầu nối tự nhiên và dễ dàng nhất để bắt đầu tình bạn.",
    },
    {
      id: "comm-10",
      question: "Sự đồng cảm trong giao tiếp được thể hiện qua câu nói nào?",
      options: [
        "Tớ hiểu cảm giác của cậu lúc này",
        "Có thế mà cũng khóc",
        "Đừng nghĩ nữa",
        "Cậu sai rồi",
      ],
      correctIndex: 0,
      explanation:
        "Câu nói này xác nhận cảm xúc của người nghe, khiến họ cảm thấy được thấu hiểu.",
    },
        {
      id: "comm-11",
      question: "Khi nhắn tin, biểu tượng '...' (đang gõ) khiến người khác?",
      options: [
        "Bình thường",
        "Có thể hồi hộp, chờ đợi",
        "Không cảm xúc",
        "Muốn tắt máy"
      ],
      correctIndex: 1,
      explanation:
        "Nhắn tin cũng tạo ra cảm xúc chờ đợi, nên cần tôn trọng thời gian của người khác."
    },
    {
      id: "comm-12",
      question: "Điều nào sau đây là giao tiếp quyết đoán (assertive)?",
      options: [
        "Im lặng chịu đựng",
        "La hét cho người khác sợ",
        "Nói rõ nhu cầu của mình nhưng vẫn tôn trọng người khác",
        "Tránh né mọi xung đột"
      ],
      correctIndex: 2,
      explanation:
        "Giao tiếp quyết đoán cân bằng giữa quyền lợi bản thân và sự tôn trọng người khác."
    },
    {
      id: "comm-13",
      question: "Câu nói nào giúp mở đầu một cuộc trò chuyện khó?",
      options: [
        "Tao phải nói cho mày biết mày sai rồi!",
        "Tớ có điều này hơi khó nói, nhưng tớ muốn chia sẻ để tụi mình hiểu nhau hơn",
        "Mày lúc nào cũng thế!",
        "Không cần nói gì"
      ],
      correctIndex: 1,
      explanation:
        "Thừa nhận sự khó khăn của cuộc trò chuyện giúp đối phương dễ tiếp nhận hơn."
    },
    {
      id: "comm-14",
      question: "Gửi tin nhắn dài khi đang nóng giận có nguy cơ gì?",
      options: [
        "Giải tỏa hết cảm xúc tốt hơn",
        "Không nguy cơ gì",
        "Dễ nói những lời xúc phạm, khó rút lại",
        "Khiến người khác hiểu mình hơn"
      ],
      correctIndex: 2,
      explanation:
        "Khi giận, não lý trí hoạt động kém, dễ viết những điều sau này hối hận."
    },
    {
      id: "comm-15",
      question: "Để trình bày ý kiến trước lớp, điều nên làm là?",
      options: [
        "Nhìn xuống đất, nói nhỏ",
        "Chuẩn bị ý chính, hít thở sâu, nói từ tốn, nhìn khán giả",
        "Nói nhanh cho xong",
        "Chỉ đọc chép lại từ giấy"
      ],
      correctIndex: 1,
      explanation:
        "Chuẩn bị và điều chỉnh giọng nói, ánh mắt giúp bài trình bày thuyết phục hơn."
    },
    {
      id: "comm-16",
      question: "Khi hiểu lầm xảy ra trong chat nhóm, cách xử lý tốt nhất là?",
      options: [
        "Cãi nhau ngay trong nhóm",
        "Chụp màn hình đi nói xấu",
        "Nhắn riêng/ gặp trực tiếp để trao đổi rõ ràng, tránh hiểu nhầm tiếp",
        "Rời nhóm không nói gì"
      ],
      correctIndex: 2,
      explanation:
        "Nói chuyện riêng giúp giảm áp lực 'đám đông' và dễ lắng nghe nhau hơn."
    },
    {
      id: "comm-17",
      question: "Sử dụng emoji trong giao tiếp online giúp?",
      options: [
        "Lúc nào dùng nhiều cũng tốt",
        "Không có tác dụng gì",
        "Thể hiện cảm xúc, giảm hiểu lầm nếu dùng đúng lúc, đúng ngữ cảnh",
        "Làm cho người khác khó chịu"
      ],
      correctIndex: 2,
      explanation:
        "Emoji giúp truyền tải sắc thái, nhưng lạm dụng có thể gây khó hiểu."
    },
    {
      id: "comm-18",
      question: "Câu trả lời nào thể hiện giao tiếp tôn trọng khi không đồng ý?",
      options: [
        "Mày nói vớ vẩn quá!",
        "Tao không quan tâm",
        "Tớ hiểu ý cậu, nhưng tớ lại nghĩ khác ở điểm này...",
        "Đừng nói nữa"
      ],
      correctIndex: 2,
      explanation:
        "Cách nói này thừa nhận ý kiến người khác nhưng vẫn giữ lập trường của mình."
    },
        {
      id: "comm-19",
      question: "Khi chứng kiến bạn mình bị nói xấu trong nhóm chat, cách phản ứng giao tiếp phù hợp là?",
      options: [
        "Im lặng cho xong chuyện",
        "Hùa theo để không bị cô lập",
        "Nhắc mọi người dừng lại, vì lời nói có thể làm bạn tổn thương",
        "Rời nhóm không nói gì"
      ],
      correctIndex: 2,
      explanation:
        "Lên tiếng nhắc nhở thể hiện bạn ủng hộ môi trường giao tiếp tôn trọng, chống bạo lực."
    },
    {
      id: "comm-20",
      question: "Để góp ý cho bạn đã lỡ đăng status mỉa mai bạn khác, bạn có thể nói:",
      options: [
        "'Mày độc mồm quá, đừng chơi với tao nữa'",
        "'Kệ nó, càng drama càng vui'",
        "'Tớ hiểu cậu đang giận, nhưng status vậy dễ làm người khác tổn thương, tụi mình thử cách khác nhé?'",
        "'Đăng nữa đi cho nóng'"
      ],
      correctIndex: 2,
      explanation:
        "Góp ý tôn trọng, tập trung vào hành vi, không công kích con người giúp bạn dễ lắng nghe hơn."
    },
    {
      id: "comm-21",
      question: "Khi cảm thấy bị tổn thương bởi lời nói của bạn cùng lớp, cách nói phù hợp là?",
      options: [
        "'Mày im đi!'",
        "'Tao ghét mày'",
        "'Tớ thấy buồn khi nghe câu đó, tớ mong cậu đừng nói kiểu đó nữa'",
        "Im lặng rồi nghỉ chơi luôn"
      ],
      correctIndex: 2,
      explanation:
        "Dùng thông điệp 'Tớ cảm thấy...' giúp bày tỏ cảm xúc mà không đổ lỗi, giảm căng thẳng."
    },
    {
      id: "comm-22",
      question: "Trong lớp, để xây dựng 'văn hóa không bạo lực', thầy cô và học sinh nên?",
      options: [
        "Không nói gì, để mọi chuyện tự nhiên",
        "Chỉ phạt nặng khi đã đánh nhau",
        "Thống nhất quy tắc giao tiếp tôn trọng và thực hành hằng ngày",
        "Cấm học sinh nói chuyện"
      ],
      correctIndex: 2,
      explanation:
        "Văn hóa giao tiếp tích cực cần được thống nhất và rèn luyện thường xuyên."
    },
    {
      id: "comm-23",
      question: "Trong giờ sinh hoạt, giáo viên chủ nhiệm hỏi: 'Lớp mình có ai thấy không an toàn không?'. Câu trả lời giúp cải thiện là?",
      options: [
        "Im lặng vì sợ mang tiếng",
        "Cười cho qua",
        "Dũng cảm chia sẻ những tình huống bắt nạt, nói xấu đang xảy ra",
        "Đổi chủ đề ngay"
      ],
      correctIndex: 2,
      explanation:
        "Dám nói ra giúp giáo viên biết và can thiệp, bảo vệ môi trường chung."
    },
    {
      id: "comm-24",
      question: "Khi đăng bài kêu gọi 'nói không với bạo lực học đường', nội dung nên?",
      options: [
        "Chửi bới những người từng gây bạo lực",
        "Dùng từ ngữ kích động, chia phe",
        "Dùng từ rõ ràng, tôn trọng, tập trung vào thông điệp tích cực",
        "Tag tên tất cả người mình ghét"
      ],
      correctIndex: 2,
      explanation:
        "Truyền thông chống bạo lực nên hướng đến giáo dục, thay đổi nhận thức, không công kích cá nhân."
    },
    {
      id: "comm-25",
      question: "Một bạn hay bị nói 'mày nhát quá', nên trả lời thế nào để giữ lập trường?",
      options: [
        "'Ừ, tao nhát thiệt'",
        "Cãi nhau đến cùng",
        "'Tớ chọn không đánh nhau vì tớ không muốn làm ai bị thương, tớ không nghĩ đó là yếu'",
        "Im lặng rồi làm theo để khỏi bị chê"
      ],
      correctIndex: 2,
      explanation:
        "Khẳng định giá trị cá nhân giúp bạn giữ nguyên tắc 'không bạo lực' mà vẫn tôn trọng người khác."
    },
    {
      id: "comm-26",
      question: "Trong nhóm bạn, làm sao để góp ý khi thấy có dấu hiệu tẩy chay một bạn khác?",
      options: [
        "Nói: 'Đừng chơi với nó nữa'",
        "Làm thinh cho hòa khí",
        "Đề nghị cả nhóm xem lại lý do, nhắc rằng tẩy chay cũng là bạo lực tinh thần",
        "Rời nhóm mà không nói gì"
      ],
      correctIndex: 2,
      explanation:
        "Gọi tên đúng vấn đề (tẩy chay là bạo lực) giúp mọi người ý thức được hậu quả."
    },
    {
      id: "comm-27",
      question: "Khi trả lời bình luận công kích trên mạng, cách nào an toàn nhất?",
      options: [
        "Đáp trả bằng những lời nặng hơn",
        "Tag bạn bè vào 'ném đá' lại",
        "Không tranh cãi, lưu lại bằng chứng và dùng kênh báo cáo chính thức",
        "Đăng story chửi bóng gió"
      ],
      correctIndex: 2,
      explanation:
        "Thay vì leo thang xung đột, hãy sử dụng công cụ bảo vệ và kênh chính thức để xử lý."
    },
    {
      id: "comm-28",
      question: "Trong lớp, câu nói nào nên tránh vì dễ trở thành bạo lực ngôn từ?",
      options: [
        "'Cậu giúp tớ với nhé'",
        "'Cậu có thể giải thích lại cho tớ không?'",
        "'Nhìn mặt là thấy ngu rồi'",
        "'Chúng ta thử cách khác được không?'"
      ],
      correctIndex: 2,
      explanation:
        "Gắn nhãn tiêu cực vào ngoại hình/trí tuệ của người khác là một dạng bạo lực tinh thần."
    },
    {
      id: "comm-29",
      question: "Khi muốn xin lỗi sau một lần lỡ lời xúc phạm bạn, cách nói phù hợp là?",
      options: [
        "'Thôi bỏ đi, có gì đâu'",
        "'Tại mày nhạy cảm quá'",
        "'Hôm đó tớ nói quá lời, tớ xin lỗi vì đã làm cậu buồn'",
        "Giả vờ như chưa từng xảy ra"
      ],
      correctIndex: 2,
      explanation:
        "Thừa nhận hành vi sai và tác động của nó giúp hàn gắn mối quan hệ tốt hơn."
    },
    {
      id: "comm-30",
      question: "Tại sao cần tập kỹ năng nói 'không' với lời rủ rê đánh nhau?",
      options: [
        "Để không bị gọi là nhát",
        "Để ít bạn hơn",
        "Để bảo vệ bản thân khỏi rắc rối pháp lý và không tiếp tay cho bạo lực",
        "Để được thầy cô khen"
      ],
      correctIndex: 2,
      explanation:
        "Từ chối rõ ràng giúp bạn tránh bị cuốn vào hành vi bạo lực dù mình không phải người khởi xướng."
    },


  ],

  // --- CHỦ ĐỀ 6: GIẢI QUYẾT MÂU THUẪN (CONFLICT RESOLUTION) ---
  conflict: [
    {
      id: "conflict-1",
      question: "Bước đầu tiên để giải quyết mâu thuẫn là gì?",
      options: [
        "Đánh nhau xem ai thắng",
        "Giữ bình tĩnh và kiểm soát cảm xúc",
        "Gọi hội đến",
        "La hét thật to",
      ],
      correctIndex: 1,
      explanation:
        "Không thể giải quyết vấn đề khi cái đầu đang 'nóng'. Bình tĩnh là chìa khóa.",
    },
    {
      id: "conflict-2",
      question: "Giải pháp 'Win-Win' (Cùng thắng) nghĩa là?",
      options: [
        "Mình thắng, bạn thua",
        "Cả hai đều nhường nhịn và tìm ra giải pháp thỏa mãn cả hai",
        "Cả hai cùng thiệt hại",
        "Nhờ cô giáo quyết định",
      ],
      correctIndex: 1,
      explanation:
        "Đây là đỉnh cao của giải quyết mâu thuẫn, đảm bảo mối quan hệ bền vững sau xung đột.",
    },
    {
      id: "conflict-3",
      question:
        "Khi hai bạn cãi nhau vì hiểu lầm, cách tốt nhất là?",
      options: [
        "Nói chuyện trực tiếp để làm rõ vấn đề",
        "Nói xấu nhau trên Facebook",
        "Nghỉ chơi luôn",
        "Nhờ bạn khác nói hộ",
      ],
      correctIndex: 0,
      explanation:
        "Giao tiếp trực tiếp giúp xóa bỏ 'tam sao thất bản' và những suy diễn sai lệch.",
    },
    {
      id: "conflict-4",
      question: "Điều gì làm mâu thuẫn leo thang nhanh nhất?",
      options: ["Lắng nghe", "Đổ lỗi và công kích cá nhân", "Xin lỗi", "Im lặng suy nghĩ"],
      correctIndex: 1,
      explanation:
        "Tấn công vào con người thay vì vấn đề sẽ thổi bùng ngọn lửa giận dữ.",
    },
    {
      id: "conflict-5",
      question: "Nếu không thể tự giải quyết mâu thuẫn, nên làm gì?",
      options: [
        "Hẹn ra cổng trường đánh nhau",
        "Tìm người hòa giải (trung gian) uy tín",
        "Chấp nhận thua thiệt",
        "Bỏ học",
      ],
      correctIndex: 1,
      explanation:
        "Người thứ ba trung lập (giáo viên, bạn bè uy tín) có thể đưa ra góc nhìn khách quan.",
    },
    {
      id: "conflict-6",
      question:
        "Xin lỗi có đồng nghĩa với việc nhận mình sai hoàn toàn không?",
      options: [
        "Có, là nhận thua",
        "Không, xin lỗi vì đã làm tổn thương bạn hoặc vì sự việc không mong muốn",
        "Xin lỗi là hèn",
        "Không bao giờ nên xin lỗi",
      ],
      correctIndex: 1,
      explanation:
        "Xin lỗi thể hiện sự trân trọng mối quan hệ hơn là cái tôi cá nhân.",
    },
    {
      id: "conflict-7",
      question:
        "Kỹ thuật 'Tạm dừng' (Time-out) trong mâu thuẫn là gì?",
      options: [
        "Bỏ đi luôn",
        "Xin phép dừng cuộc tranh luận một lát để bình tĩnh lại rồi nói tiếp",
        "Ngủ gật",
        "Chặn số điện thoại",
      ],
      correctIndex: 1,
      explanation:
        "Tạm dừng giúp ngăn chặn những lời nói gây tổn thương bột phát trong lúc nóng giận.",
    },
    {
      id: "conflict-8",
      question: "Sự khác biệt về quan điểm là?",
      options: [
        "Điều tồi tệ",
        "Điều bình thường trong cuộc sống",
        "Dấu hiệu của kẻ thù",
        "Lý do để ghét nhau",
      ],
      correctIndex: 1,
      explanation:
        "Thế giới đa dạng, mỗi người một góc nhìn. Chấp nhận sự khác biệt giúp giảm thiểu xung đột.",
    },
    {
      id: "conflict-9",
      question: "Thỏa hiệp (Compromise) nghĩa là?",
      options: [
        "Mỗi bên lùi một bước để đạt được tiếng nói chung",
        "Một người chịu thiệt hết",
        "Đánh nhau ai thắng thì được",
        "Không ai chịu ai",
      ],
      correctIndex: 0,
      explanation:
        "Thỏa hiệp là kỹ năng sống cần thiết khi không thể đạt được giải pháp Win-Win.",
    },
    {
      id: "conflict-10",
      question:
        "Trong mâu thuẫn, tại sao không nên lôi chuyện cũ ra nói?",
      options: [
        "Vì chuyện cũ chán rồi",
        "Vì nó làm vấn đề hiện tại trở nên rối rắm và nặng nề hơn",
        "Vì trí nhớ kém",
        "Nên lôi ra để kể tội",
      ],
      correctIndex: 1,
      explanation:
        "Tập trung vào vấn đề hiện tại. Bới móc quá khứ chỉ làm tăng sự thù địch.",
    },
        {
      id: "conflict-11",
      question: "Trong mâu thuẫn, 'chọn trận mà đánh' nghĩa là gì?",
      options: [
        "Đánh nhau ở chỗ vắng",
        "Chỉ tập trung vào những vấn đề thật sự quan trọng, bỏ qua chuyện nhỏ không đáng",
        "Đánh khi mình khỏe hơn",
        "Rủ thêm nhiều người"
      ],
      correctIndex: 1,
      explanation:
        "Không phải mâu thuẫn nào cũng cần giải quyết đến cùng; chọn lọc giúp tiết kiệm năng lượng cảm xúc."
    },
    {
      id: "conflict-12",
      question: "Thái độ mỉa mai, châm biếm trong tranh luận sẽ?",
      options: [
        "Khiến cuộc nói chuyện vui hơn",
        "Giảm căng thẳng",
        "Làm đối phương thấy bị coi thường và dễ bùng nổ xung đột",
        "Không ảnh hưởng gì"
      ],
      correctIndex: 2,
      explanation:
        "Mỉa mai là một dạng bạo lực tinh thần, khiến mâu thuẫn nặng nề hơn."
    },
    {
      id: "conflict-13",
      question: "Khi hai bên đang rất nóng giận, điều KHÔNG nên làm là?",
      options: [
        "Tạm dừng trao đổi",
        "Hẹn nói chuyện lại khi bình tĩnh",
        "Tiếp tục tranh luận đến khi có người 'thua'",
        "Tập trung vào vấn đề, không công kích cá nhân"
      ],
      correctIndex: 2,
      explanation:
        "Cố tranh thắng–thua trong lúc nóng giận chỉ khiến mối quan hệ rạn nứt."
    },
    {
      id: "conflict-14",
      question: "Một câu mở đầu giúp hạ nhiệt tranh cãi là?",
      options: [
        "Mày lúc nào cũng thế!",
        "Thôi bỏ đi!",
        "Chúng ta thử cùng nhìn lại chuyện này từ đầu được không?",
        "Không có gì để nói nữa"
      ],
      correctIndex: 2,
      explanation:
        "Câu nói này mở ra cơ hội cùng nhau xem lại sự việc thay vì đổ lỗi."
    },
    {
      id: "conflict-15",
      question: "Trong nhóm bạn, giải quyết mâu thuẫn bằng cách bầu chọn phe thường dẫn đến?",
      options: [
        "Công bằng",
        "Tăng chia rẽ, tạo bè phái",
        "Gắn kết hơn",
        "Không sao cả"
      ],
      correctIndex: 1,
      explanation:
        "Chia phe khiến mâu thuẫn giữa hai người lan ra thành mâu thuẫn cả nhóm."
    },
    {
      id: "conflict-16",
      question: "Vai trò của người hòa giải (mediator) là?",
      options: [
        "Chọn bên đúng–sai",
        "Đứng về một phía",
        "Lắng nghe cả hai, giúp họ tự tìm giải pháp phù hợp",
        "Phán xét thật mạnh"
      ],
      correctIndex: 2,
      explanation:
        "Người hòa giải giữ sự trung lập, không thay hai bên quyết định."
    },
    {
      id: "conflict-17",
      question: "Sau khi mâu thuẫn được giải quyết, điều gì giúp khôi phục quan hệ?",
      options: [
        "Không bao giờ nói chuyện lại",
        "Nhắc lại lỗi của nhau liên tục",
        "Cùng thống nhất bài học rút ra và tôn trọng thỏa thuận mới",
        "Giả vờ như chưa từng xảy ra"
      ],
      correctIndex: 2,
      explanation:
        "Rút kinh nghiệm chung giúp hai bên trưởng thành hơn và tránh lặp lại xung đột cũ."
    },
    {
      id: "conflict-18",
      question: "Khi chỉ một bên luôn phải nhường nhịn trong mâu thuẫn, về lâu dài sẽ?",
      options: [
        "Giữ hòa khí mãi mãi",
        "Không ảnh hưởng gì",
        "Khiến người đó ấm ức, dễ bùng nổ hoặc cắt đứt quan hệ",
        "Làm tình bạn bền hơn"
      ],
      correctIndex: 2,
      explanation:
        "Mối quan hệ lành mạnh cần sự tôn trọng và nhường nhịn từ cả hai phía, không phải hi sinh một chiều."
    },
        {
      id: "conflict-19",
      question: "Hai bạn mâu thuẫn vì một status hiểu lầm trên mạng. Bước hợp lý đầu tiên là?",
      options: [
        "Kêu gọi cả lớp vào comment công kích",
        "Đến gặp trực tiếp hoặc nhắn riêng để hỏi rõ ý",
        "Đăng status đáp trả gay gắt",
        "Nói xấu sau lưng"
      ],
      correctIndex: 1,
      explanation:
        "Trao đổi trực tiếp giúp làm rõ dụng ý, tránh 'tam sao thất bản' và bùng nổ bạo lực."
    },
    {
      id: "conflict-20",
      question: "Khi mâu thuẫn giữa hai bạn bắt đầu có dấu hiệu kéo cả nhóm chia phe, cần?",
      options: [
        "Chọn phe mạnh hơn để theo",
        "Để mặc cho nhóm tự tách đôi",
        "Khuyến khích hai bạn chính nói chuyện riêng, không lôi kéo cả nhóm",
        "Đẩy mâu thuẫn cho căng hẳn rồi tính"
      ],
      correctIndex: 2,
      explanation:
        "Ngăn mâu thuẫn lan rộng giúp bảo vệ sự hòa hợp của cả tập thể."
    },
    {
      id: "conflict-21",
      question: "Một cuộc họp lớp để giải quyết xung đột nên tập trung vào?",
      options: [
        "Tố hết lỗi của nhau từ trước tới nay",
        "Tìm xem ai 'xấu tính' hơn",
        "Xác định vấn đề chính, lắng nghe hai bên, thống nhất giải pháp chung",
        "Đổ lỗi cho người không có mặt"
      ],
      correctIndex: 2,
      explanation:
        "Tập trung vào giải pháp thay vì chỉ trích cá nhân là nguyên tắc quan trọng trong hòa giải."
    },
    {
      id: "conflict-22",
      question: "Sau khi hòa giải, tại sao cần thống nhất 'không nhắc lại chuyện cũ để trêu chọc'?",
      options: [
        "Vì lười nhắc lại",
        "Vì sợ bị thầy cô biết",
        "Để vết thương tâm lý có cơ hội lành lại, tránh tái khởi động mâu thuẫn",
        "Để quên luôn người kia"
      ],
      correctIndex: 2,
      explanation:
        "Nhắc lại chuyện cũ để trêu chọc sẽ làm nạn nhân cảm thấy không được tôn trọng và mất lòng tin."
    },
    {
      id: "conflict-23",
      question: "Một dạng 'bạo lực lạnh' trong mâu thuẫn là?",
      options: [
        "Cãi nhau to tiếng",
        "Đánh nhau",
        "Cố tình im lặng, tẩy chay, không cho người kia cơ hội giải thích",
        "Viết bản kiểm điểm"
      ],
      correctIndex: 2,
      explanation:
        "Tẩy chay, im lặng kéo dài cũng gây tổn thương không kém bạo lực lời nói."
    },
    {
      id: "conflict-24",
      question: "Khi một mâu thuẫn xoay quanh tin đồn không rõ nguồn gốc, điều quan trọng là?",
      options: [
        "Tin ngay và hành động",
        "Thêm thắt chi tiết cho hấp dẫn",
        "Xác minh thông tin từ nhiều nguồn, hỏi trực tiếp người liên quan",
        "Share cho nhiều người biết"
      ],
      correctIndex: 2,
      explanation:
        "Rất nhiều bạo lực học đường bắt nguồn từ tin đồn sai sự thật."
    },
    {
      id: "conflict-25",
      question: "Trong mâu thuẫn, câu nói nào có thể làm dịu tình hình?",
      options: [
        "'Mày lúc nào cũng vậy!'",
        "'Tao không cần nghe mày nữa'",
        "'Tụi mình đều đang giận, có thể tạm dừng rồi nói tiếp sau được không?'",
        "'Đánh nhau cho xong'"
      ],
      correctIndex: 2,
      explanation:
        "Thừa nhận cảm xúc hiện tại và đề nghị tạm dừng giúp tránh những hành vi bốc đồng."
    },
    {
      id: "conflict-26",
      question: "Một bạn bị hiểu nhầm là 'nói xấu bạn thân'. Bạn nên làm gì để giải quyết?",
      options: [
        "Nghỉ chơi không nói gì",
        "Post status ẩn ý",
        "Chủ động giải thích, đưa ra bối cảnh rõ ràng và lắng nghe cảm xúc của bạn thân",
        "Mắng lại cho hả giận"
      ],
      correctIndex: 2,
      explanation:
        "Sự chủ động, chân thành trong giao tiếp là chìa khóa để giữ tình bạn."
    },
    {
      id: "conflict-27",
      question: "Khi thầy cô tham gia hòa giải, học sinh nên?",
      options: [
        "Chỉ nói những gì có lợi cho mình",
        "Đổ hết lỗi cho người kia",
        "Thành thật chia sẻ, lắng nghe và tôn trọng quyết định chung",
        "Im lặng không hợp tác"
      ],
      correctIndex: 2,
      explanation:
        "Nếu không thành thật, mâu thuẫn chỉ tạm lắng nhưng không được giải quyết thực sự."
    },
    {
      id: "conflict-28",
      question: "Biện pháp 'phục hồi quan hệ' sau mâu thuẫn bạo lực là?",
      options: [
        "Cho nghỉ học",
        "Bắt viết cam kết rồi thôi",
        "Tổ chức hoạt động chung tích cực, phân vai hợp tác trong lớp",
        "Không cho hai bên gặp nhau nữa"
      ],
      correctIndex: 2,
      explanation:
        "Cùng tham gia hoạt động tích cực giúp xây lại niềm tin và hình ảnh tốt đẹp về nhau."
    },
    {
      id: "conflict-29",
      question: "Tại sao nói 'đánh cho nhớ đời' không phải là cách giải quyết mâu thuẫn tốt?",
      options: [
        "Vì đánh xong sẽ quên",
        "Vì làm cả hai đều đau nhưng vấn đề gốc không được giải quyết",
        "Vì đánh nhau tốn sức",
        "Vì thầy cô sẽ la"
      ],
      correctIndex: 1,
      explanation:
        "Bạo lực chỉ làm mâu thuẫn nặng thêm, kéo theo hậu quả pháp lý và tâm lý."
    },
    {
      id: "conflict-30",
      question: "Điều quan trọng nhất khi giải quyết mâu thuẫn trong trường là?",
      options: [
        "Tìm người thắng – kẻ thua",
        "Giữ thể diện cho một bên",
        "Đảm bảo an toàn, tôn trọng và học được bài học chung để tránh lặp lại",
        "Làm cho thật to chuyện"
      ],
      correctIndex: 2,
      explanation:
        "Giải quyết mâu thuẫn tốt giúp môi trường học đường an toàn hơn cho tất cả mọi người."
    },

  ],
  "online-safety": [
  {
    id: "os-1",
    question: "Tại sao HS cần đặt mật khẩu mạnh cho tài khoản mạng xã hội?",
    options: [
      "Để khoe với bạn bè",
      "Tránh bị chiếm đoạt tài khoản và sử dụng vào mục đích bắt nạt",
      "Cho dễ nhớ",
      "Vì Facebook yêu cầu"
    ],
    correctIndex: 1,
    explanation: "Tài khoản có thể bị hack để tung tin xấu, giả mạo hoặc bắt nạt người khác."
  },
  {
    id: "os-2",
    question: "Khi nhận được đường link lạ từ bạn bè, bạn nên?",
    options: [
      "Bấm ngay vì bạn gửi",
      "Không mở, hỏi lại bạn và kiểm tra nguồn",
      "Chia sẻ cho nhóm lớp",
      "Đăng story khoe"
    ],
    correctIndex: 1,
    explanation: "Nhiều tài khoản bị hack dùng để phát tán link độc."
  },
  {
    id: "os-3",
    question: "Người lạ nhắn xin ảnh cá nhân riêng tư là dấu hiệu?",
    options: [
      "Giao lưu",
      "Lừa đảo hoặc xâm hại online",
      "Tán tỉnh bình thường",
      "Không sao"
    ],
    correctIndex: 1,
    explanation: "Xin ảnh riêng tư là hành vi nguy hiểm, có thể dùng để tống tiền hoặc bắt nạt."
  },
  {
    id: "os-4",
    question: "Khi thấy clip bạo lực lan truyền, bạn nên?",
    options: [
      "Chia sẻ để mọi người biết",
      "Báo cáo nội dung và không lan truyền",
      "Tải về lưu lại",
      "Bình luận chế giễu"
    ],
    correctIndex: 1,
    explanation: "Lan truyền clip BLHD khiến nạn nhân thêm tổn thương."
  },
  {
    id: "os-5",
    question: "Deepfake có thể gây hại như thế nào?",
    options: [
      "Tạo video giải trí",
      "Tạo video giả xúc phạm danh dự bạn",
      "Không gây hại gì",
      "Chỉ người nổi tiếng bị ảnh hưởng"
    ],
    correctIndex: 1,
    explanation: "Deepfake có thể tạo clip giả làm bạn bị chế giễu hoặc bôi nhọ."
  },
  {
    id: "os-6",
    question: "Hành vi tung tin giả về một bạn trong lớp là?",
    options: [
      "Trò đùa",
      "Bạo lực mạng và vi phạm pháp luật",
      "Không liên quan",
      "Giải trí"
    ],
    correctIndex: 1,
    explanation: "Tin giả gây tổn thương danh dự và có thể cấu thành vu khống."
  },
  {
    id: "os-7",
    question: "Check-in vị trí liên tục có nguy cơ?",
    options: [
      "Không nguy hiểm",
      "Kẻ xấu theo dõi lịch trình",
      "Giúp bạn bè biết bạn đang ở đâu",
      "Tăng tương tác"
    ],
    correctIndex: 1,
    explanation: "Thông tin vị trí có thể bị lợi dụng."
  },
  {
    id: "os-8",
    question: "Bị người lạ spam tin nhắn chửi bới, bạn nên?",
    options: [
      "Cãi nhau",
      "Chặn + báo cáo + lưu bằng chứng",
      "Tạo nick phụ chửi lại",
      "Rủ bạn bè vào 'ném đá'"
    ],
    correctIndex: 1,
    explanation: "Giữ bằng chứng và báo cáo là cách an toàn."
  },
  {
    id: "os-9",
    question: "Chia sẻ ảnh lớp mà có bạn phản đối là?",
    options: [
      "Bình thường",
      "Vi phạm quyền riêng tư",
      "Không sao vì ảnh tập thể",
      "Chỉ là vui"
    ],
    correctIndex: 1,
    explanation: "Bạn có quyền không muốn hình ảnh mình bị công khai."
  },
  {
    id: "os-10",
    question: "Bình luận body-shaming trên mạng là?",
    options: [
      "Tự do ngôn luận",
      "Bạo lực tinh thần online",
      "Ý kiến cá nhân",
      "Hài hước"
    ],
    correctIndex: 1,
    explanation: "Body shaming làm tổn thương sâu sắc và có thể xử phạt theo luật."
  },

  // 20 câu còn lại tiếp tục ↓
  {
    id: "os-11",
    question: "Kẻ xấu giả danh giáo viên yêu cầu gửi thông tin cá nhân nhằm?",
    options: [
      "Kiểm tra lớp",
      "Lừa đảo hoặc xâm phạm thông tin",
      "Tăng tương tác",
      "Kiểm tra điểm"
    ],
    correctIndex: 1,
    explanation: "Hacker thường mạo danh để thu thập thông tin."
  },
  {
    id: "os-12",
    question: "Tại sao không nên đăng mật khẩu Wi-Fi lớp công khai?",
    options: [
      "Chỉ là mạng thôi",
      "Có thể bị dùng để truy cập nội dung xấu, ảnh hưởng cả trường",
      "Cho mọi người biết",
      "Để bạn bè xài chung"
    ],
    correctIndex: 1,
    explanation: "Mạng trường dễ bị lợi dụng."
  },
  {
    id: "os-13",
    question: "Hành vi gửi ảnh bạo lực để đe dọa là?",
    options: ["Trêu đùa", "Khủng bố tinh thần", "Dạy dỗ", "Giải trí"],
    correctIndex: 1,
    explanation: "Hình ảnh bạo lực có thể làm nạn nhân stress nặng."
  },
  {
    id: "os-14",
    question: "Khi bị doxxing (lộ thông tin cá nhân), bạn nên?",
    options: [
      "Bỏ mặc",
      "Báo người lớn, thay đổi mật khẩu, báo nền tảng",
      "Cãi nhau",
      "Tự công khai thêm cho 'công bằng'"
    ],
    correctIndex: 1,
    explanation: "Doxxing là nguy hiểm, cần xử lý sớm."
  },
  {
    id: "os-15",
    question: "Ảnh 'meme' chế giễu bạn học có thể gây?",
    options: ["Vui vẻ", "Tổn thương tinh thần", "Hài hước", "Không sao"],
    correctIndex: 1,
    explanation: "Meme xúc phạm cũng là bạo lực mạng."
  },
  {
    id: "os-16",
    question: "Nội dung nào KHÔNG nên chia sẻ?",
    options: [
      "Thành tích học tập",
      "Lịch trình cá nhân chi tiết",
      "Ảnh phong cảnh",
      "Thông tin trường lớp chung"
    ],
    correctIndex: 1,
    explanation: "Lịch trình có thể bị kẻ xấu lợi dụng."
  },
  {
    id: "os-17",
    question: "Khi bị ép gửi ảnh/video riêng tư, bạn nên?",
    options: [
      "Gửi để tránh phiền",
      "Từ chối – chặn – báo cáo",
      "Chửi lại",
      "Xin thêm thời gian"
    ],
    correctIndex: 1,
    explanation: "Gửi ảnh nhạy cảm rất nguy hiểm."
  },
  {
    id: "os-18",
    question: "Khi gặp tài khoản giả mạo bạn bè, bạn nên?",
    options: ["Follow", "Báo cáo và cảnh báo bạn", "Nhắn tin thử", "Không quan tâm"],
    correctIndex: 1,
    explanation: "Nick giả mạo thường dùng để lừa đảo."
  },
  {
    id: "os-19",
    question: "Dấu hiệu một group chat đang toxic?",
    options: [
      "Chia sẻ bài học",
      "Chế giễu, công kích thành viên",
      "Trao đổi bài tập",
      "Hỏi thăm nhau"
    ],
    correctIndex: 1,
    explanation: "Toxic chat có thể gây BLHD tinh thần."
  },
  {
    id: "os-20",
    question: "Khi một bạn bị cyberbully, bạn nên?",
    options: [
      "Im lặng quan sát",
      "Động viên + báo người lớn + không lan truyền",
      "Hùa theo",
      "Chế meme"
    ],
    correctIndex: 1,
    explanation: "Lên tiếng bảo vệ giúp giảm BLHD."
  },
  {
    id: "os-21",
    question: "Thông tin nào KHÔNG nên đăng công khai?",
    options: [
      "Tên",
      "Số CCCD của bố mẹ",
      "Sở thích",
      "Thành tích học tập"
    ],
    correctIndex: 1,
    explanation: "CCCD là thông tin nhạy cảm có thể bị lạm dụng."
  },
  {
    id: "os-22",
    question: "Ứng xử văn minh trên mạng gồm?",
    options: [
      "Không kiểm tra nguồn tin",
      "Tôn trọng – lịch sự – không xúc phạm",
      "Spam càng nhiều càng tốt",
      "Bình luận chửi bới"
    ],
    correctIndex: 1,
    explanation: "Netiquette giúp môi trường số an toàn hơn."
  },
  {
    id: "os-23",
    question: "Tại sao chê ngoại hình online nguy hiểm hơn offline?",
    options: [
      "Vì đăng lên mạng có thể lan truyền nhanh và lâu dài",
      "Vì mạng yếu",
      "Vì ít người thấy",
      "Không nguy hiểm"
    ],
    correctIndex: 0,
    explanation: "Dấu chân số khiến nạn nhân chịu áp lực kéo dài."
  },
  {
    id: "os-24",
    question: "Spam inbox nhiều lần để làm phiền được gọi là?",
    options: [
      "Tương tác",
      "Quấy rối online",
      "Trò đùa",
      "Không sao"
    ],
    correctIndex: 1,
    explanation: "Spam gây căng thẳng tâm lý."
  },
  {
    id: "os-25",
    question: "Khi thấy bài đăng tố cáo bạn của mình nhưng không rõ thật giả?",
    options: [
      "Chia sẻ ngay",
      "Không lan truyền – tìm hiểu nguồn – hỏi người lớn",
      "Cmt 'bóc phốt'",
      "Tag cả lớp vào xem"
    ],
    correctIndex: 1,
    explanation: "Tố cáo sai có thể gây BLHD nghiêm trọng."
  },
  {
    id: "os-26",
    question: "Chế ảnh bạn học và đăng lên TikTok có thể bị?",
    options: [
      "Khen ngợi",
      "Xử phạt vì xúc phạm danh dự",
      "Không sao",
      "Tăng follow"
    ],
    correctIndex: 1,
    explanation: "Chế ảnh người thật không xin phép là vi phạm."
  },
  {
    id: "os-27",
    question: "Tại sao không nên thêm người lạ vào nhóm lớp?",
    options: [
      "Không liên quan",
      "Có thể bị khai thác thông tin học sinh",
      "Càng đông càng vui",
      "Không nguy hiểm"
    ],
    correctIndex: 1,
    explanation: "Người lạ có thể thu thập dữ liệu HS."
  },
  {
    id: "os-28",
    question: "Hành vi mạo danh để lấy tiền là?",
    options: ["Trolling", "Lừa đảo online", "Đùa vui", "Bình thường"],
    correctIndex: 1,
    explanation: "Giả mạo danh tính là tội phạm mạng."
  },
  {
    id: "os-29",
    question: "Nên làm gì khi bị lộ clip riêng tư?",
    options: [
      "Chạy trốn",
      "Báo ngay 111 / 113 / người lớn tin cậy",
      "Xóa nick",
      "Cãi nhau với người tung clip"
    ],
    correctIndex: 1,
    explanation: "Lộ clip cần sự hỗ trợ pháp lý ngay."
  },
  {
    id: "os-30",
    question: "Hành vi phát tán bài kiểm tra riêng tư của bạn là?",
    options: ["Chia sẻ kiến thức", "Xâm phạm quyền riêng tư", "Không sao", "Giúp học tập"],
    correctIndex: 1,
    explanation: "Tài liệu cá nhân cũng là quyền riêng tư."
  }
],
"empathy": [
  {
    id: "emp-1",
    question: "Thấu cảm giúp giảm bạo lực học đường vì?",
    options: [
      "Giúp hiểu cảm xúc người khác, hạn chế tổn thương họ",
      "Không liên quan",
      "Giúp bạn trở nên yếu đuối",
      "Khiến người khác lợi dụng"
    ],
    correctIndex: 0,
    explanation: "Thấu cảm làm tăng sự tôn trọng và giảm hành vi gây hại."
  },
  {
    id: "emp-2",
    question: "Điều nào là biểu hiện của sự thấu cảm?",
    options: [
      "Cười khi bạn buồn",
      "Lắng nghe và đặt mình vào hoàn cảnh của bạn",
      "Bỏ mặc cảm xúc người khác",
      "Chỉ tập trung vào bản thân"
    ],
    correctIndex: 1,
    explanation: "Thấu cảm bắt đầu từ việc hiểu cảm xúc người khác."
  },
  {
    id: "emp-3",
    question: "Câu nói nào thể hiện sự thấu cảm?",
    options: [
      "Có thế mà cũng buồn?",
      "Tớ hiểu cảm giác của cậu, cậu muốn kể thêm không?",
      "Đừng làm quá lên",
      "Mình không quan tâm"
    ],
    correctIndex: 1,
    explanation: "Thể hiện sự lắng nghe và quan tâm tới cảm xúc bạn."
  },
  {
    id: "emp-4",
    question: "Khi thấy bạn khóc trong lớp, bạn nên?",
    options: [
      "Chụp ảnh đăng story",
      "Bỏ đi",
      "Đến hỏi thăm nhẹ nhàng nếu bạn sẵn sàng chia sẻ",
      "Cười trêu chọc"
    ],
    correctIndex: 2,
    explanation: "Hỗ trợ tinh thần đúng cách giúp bạn giảm căng thẳng."
  },
  {
    id: "emp-5",
    question: "Một dấu hiệu cho thấy ai đó đang tổn thương là?",
    options: [
      "Cười rất lớn",
      "Thu mình, ít nói, né tránh giao tiếp",
      "Ăn rất nhiều",
      "Nói nhiều hơn bình thường"
    ],
    correctIndex: 1,
    explanation: "Thu mình là biểu hiện phổ biến của tổn thương tâm lý."
  },
  {
    id: "emp-6",
    question: "Khi bạn không hiểu cảm xúc của người khác, bạn nên?",
    options: [
      "Giả vờ hiểu",
      "Phán xét",
      "Hỏi nhẹ nhàng: 'Bạn cảm thấy sao về chuyện đó?'",
      "Cắt ngang câu chuyện"
    ],
    correctIndex: 2,
    explanation: "Câu hỏi mở giúp họ chia sẻ nhiều hơn."
  },
  {
    id: "emp-7",
    question: "Một dạng thiếu thấu cảm là?",
    options: [
      "Quan tâm đến người khác",
      "So sánh nỗi đau của họ với mình",
      "Lắng nghe chủ động",
      "Khuyến khích người khác chia sẻ"
    ],
    correctIndex: 1,
    explanation: "So sánh cảm xúc làm người kia cảm thấy bị coi nhẹ."
  },
  {
    id: "emp-8",
    question: "Đâu là cách thể hiện sự tôn trọng cảm xúc bạn?",
    options: [
      "Nói họ 'yếu đuối'",
      "Cho họ không gian khi cần",
      "Xem nhẹ cảm xúc của họ",
      "Bắt họ kể ngay"
    ],
    correctIndex: 1,
    explanation: "Mỗi người có cách đối diện cảm xúc khác nhau."
  },
  {
    id: "emp-9",
    question: "Phản ứng tốt khi bạn thấy người khác căng thẳng?",
    options: [
      "Nói 'Bớt căng thẳng đi'",
      "Phớt lờ họ",
      "Ngồi cạnh và cho họ cảm giác an toàn",
      "Chụp lại gửi cho nhóm"
    ],
    correctIndex: 2,
    explanation: "Có mặt đúng lúc tạo cảm giác được hỗ trợ."
  },
  {
    id: "emp-10",
    question: "Tại sao thấu cảm là kỹ năng quan trọng trong lớp học?",
    options: [
      "Giúp bạn được điểm tốt",
      "Giúp xây dựng tập thể đoàn kết, giảm xung đột",
      "Không quan trọng",
      "Chỉ người lớn mới cần"
    ],
    correctIndex: 1,
    explanation: "Thấu cảm tạo môi trường an toàn trong lớp."
  },

  // 20 câu tiếp theo ↓
  {
    id: "emp-11",
    question: "Khi một bạn kể chuyện buồn, điều KHÔNG nên nói là?",
    options: [
      "Tớ ở đây nếu cậu cần",
      "Tớ thông cảm với cậu",
      "Có chuyện vậy mà làm quá lên",
      "Cậu muốn mình giúp gì không?"
    ],
    correctIndex: 2,
    explanation: "Câu xem nhẹ cảm xúc khiến người kia tổn thương thêm."
  },
  {
    id: "emp-12",
    question: "Hành động nào thể hiện 'đồng hành' với bạn bị tổn thương?",
    options: [
      "Ngồi cạnh bạn khi bạn buồn",
      "Kệ bạn",
      "Trêu chọc",
      "Đẩy bạn vào nói giữa lớp"
    ],
    correctIndex: 0,
    explanation: "Đồng hành là cách hỗ trợ tinh thần hiệu quả."
  },
  {
    id: "emp-13",
    question: "Một người dễ tổn thương khi?",
    options: [
      "Luôn vui vẻ",
      "Bị cô lập hoặc bị chế giễu trong thời gian dài",
      "Có nhiều bạn bè",
      "Học giỏi"
    ],
    correctIndex: 1,
    explanation: "Cô lập lâu ngày làm sức khỏe tinh thần suy yếu."
  },
  {
    id: "emp-14",
    question: "Thấu cảm KHÔNG phải là?",
    options: [
      "Hiểu cảm xúc người khác",
      "Tôn trọng cảm xúc người khác",
      "Cười nhạo cảm xúc người khác",
      "Đặt mình vào vị trí của họ"
    ],
    correctIndex: 2,
    explanation: "Chế giễu cảm xúc là hành vi bạo lực tinh thần."
  },
  {
    id: "emp-15",
    question: "Câu nào là phản hồi thấu cảm?",
    options: [
      "Cố chịu đi!",
      "Tớ nghe nè, cậu có muốn kể thêm không?",
      "Ai cũng vậy thôi",
      "Đừng buồn nữa"
    ],
    correctIndex: 1,
    explanation: "Phản hồi mở giúp người đối diện bộc lộ cảm xúc."
  },
  {
    id: "emp-16",
    question: "Một ví dụ về thấu cảm trong lớp?",
    options: [
      "Giúp bạn mới hòa nhập vào lớp",
      "Làm lơ người mới",
      "Chê bạn nói ngọng",
      "Cười khi bạn té"
    ],
    correctIndex: 0,
    explanation: "Giúp bạn hòa nhập giảm nguy cơ bị bắt nạt."
  },
  {
    id: "emp-17",
    question: "Tại sao thấu cảm giúp ngăn bạo lực?",
    options: [
      "Vì hiểu người khác giúp giảm hành vi gây tổn thương",
      "Không liên quan",
      "Vì thấu cảm làm bạn yếu hơn",
      "Vì thấu cảm bị phạt"
    ],
    correctIndex: 0,
    explanation: "Nhận ra người khác cũng có cảm xúc."
  },
  {
    id: "emp-18",
    question: "Hành động nào KHÔNG phải thấu cảm?",
    options: [
      "Cố hiểu lý do bạn buồn",
      "Cười trước nỗi đau của người khác",
      "Giúp bạn đứng lên khi té",
      "An ủi nhẹ nhàng"
    ],
    correctIndex: 1,
    explanation: "Cười nhạo là biểu hiện thiếu thấu cảm."
  },
  {
    id: "emp-19",
    question: "Khi bạn tức giận, điều nên làm để không làm tổn thương người khác?",
    options: [
      "Chửi họ ngay",
      "Tạm dừng một chút trước khi phản ứng",
      "Đập bàn",
      "Đăng status đá xéo"
    ],
    correctIndex: 1,
    explanation: "Giữ bình tĩnh giúp phản ứng hợp lý hơn."
  },
  {
    id: "emp-20",
    question: "Người có thấu cảm cao thường?",
    options: [
      "Biết nhìn vấn đề từ góc nhìn của người khác",
      "Nhanh phán xét",
      "Thích gây gổ",
      "Không quan tâm ai"
    ],
    correctIndex: 0,
    explanation: "Thấu cảm = hiểu góc nhìn khác."
  },
  {
    id: "emp-21",
    question: "Thấu cảm giúp cải thiện điều gì trong nhóm?",
    options: [
      "Chia bè phái",
      "Tăng sự đoàn kết",
      "Tăng cãi nhau",
      "Tăng nói xấu"
    ],
    correctIndex: 1,
    explanation: "Đoàn kết ngăn mầm mống bạo lực."
  },
  {
    id: "emp-22",
    question: "Một dấu hiệu người cần được thấu cảm là?",
    options: [
      "Họ giận dữ bất thường",
      "Họ cười nhiều",
      "Họ nói luôn",
      "Họ đổi màu tóc"
    ],
    correctIndex: 0,
    explanation: "Giận dữ có thể che giấu tổn thương."
  },
  {
    id: "emp-23",
    question: "Nhìn người khác khóc và cười nhạo là hành vi?",
    options: [
      "Hài hước",
      "Bạo lực tinh thần",
      "Bình thường",
      "Thân thiết"
    ],
    correctIndex: 1,
    explanation: "Cười nhạo cảm xúc là BLHD."
  },
  {
    id: "emp-24",
    question: "Sự thấu cảm phát triển mạnh khi?",
    options: [
      "Bạn chịu lắng nghe",
      "Bạn bỏ mặc",
      "Bạn xem thường bạn khác",
      "Bạn luôn đúng"
    ],
    correctIndex: 0,
    explanation: "Lắng nghe là chìa khóa thấu cảm."
  },
  {
    id: "emp-25",
    question: "Thấu cảm giúp giảm nguy cơ?",
    options: [
      "Gossip (nói xấu)",
      "Bạo lực học đường",
      "Cả hai",
      "Không cái nào"
    ],
    correctIndex: 2,
    explanation: "Thấu cảm → ít tổn thương → ít xung đột."
  },
  {
    id: "emp-26",
    question: "Khi hiểu được nỗi đau của người khác, bạn sẽ?",
    options: [
      "Không muốn làm họ tổn thương",
      "Chê họ",
      "Tự cao",
      "Im lặng cho qua"
    ],
    correctIndex: 0,
    explanation: "Hiểu → không gây hại."
  },
  {
    id: "emp-27",
    question: "Thấu cảm KHÔNG phải là đồng ý với mọi điều người khác nói, mà là?",
    options: [
      "Hiểu họ cảm thấy thế nào",
      "Tự bỏ ý kiến",
      "Luôn xin lỗi",
      "Luôn im lặng"
    ],
    correctIndex: 0,
    explanation: "Thấu cảm = hiểu cảm xúc, không phải từ bỏ quan điểm."
  },
  {
    id: "emp-28",
    question: "Thấu cảm giúp hạn chế hành vi nào?",
    options: [
      "Chế giễu",
      "Cô lập bạn bè",
      "Nói xấu sau lưng",
      "Tất cả"
    ],
    correctIndex: 3,
    explanation: "Hiểu cảm xúc → tránh gây hại."
  },
  {
    id: "emp-29",
    question: "Câu nói nào thiếu thấu cảm?",
    options: [
      "Tớ hiểu cậu buồn",
      "Có gì đâu mà stress?",
      "Cậu muốn tớ ở đây cùng không?",
      "Mình luôn ủng hộ cậu"
    ],
    correctIndex: 1,
    explanation: "Xem nhẹ cảm xúc làm người khác tổn thương thêm."
  },
  {
    id: "emp-30",
    question: "Khi bạn thấy người khác run rẩy vì lo lắng, bạn nên?",
    options: [
      "Cười vì trông hài",
      "Nói nhẹ nhàng trấn an",
      "Quay clip",
      "Bỏ đi"
    ],
    correctIndex: 1,
    explanation: "Sự an ủi đúng lúc giúp người khác cảm thấy an toàn."
  }
],
"bystander": [
  {
    id: "bys-1",
    question: "Bystander là gì trong bạo lực học đường?",
    options: [
      "Người gây bạo lực",
      "Người chứng kiến sự việc",
      "Người bị bắt nạt",
      "Giáo viên"
    ],
    correctIndex: 1,
    explanation: "Bystander = người chứng kiến."
  },
  {
    id: "bys-2",
    question: "Tại sao người chứng kiến rất quan trọng?",
    options: [
      "Có thể giúp giảm hoặc chấm dứt bạo lực",
      "Không quan trọng",
      "Chỉ xem cho vui",
      "Để quay clip"
    ],
    correctIndex: 0,
    explanation: "Hành động của bystander có ảnh hưởng lớn."
  },
  {
    id: "bys-3",
    question: "Khi chứng kiến bạn bị đánh, điều KHÔNG nên làm?",
    options: [
      "Kêu gọi người lớn",
      "Hét dừng lại",
      "Quay clip đăng TikTok",
      "Gọi bảo vệ"
    ],
    correctIndex: 2,
    explanation: "Lan truyền clip gây tổn thương thêm."
  },
  {
    id: "bys-4",
    question: "Một bystander dũng cảm sẽ?",
    options: [
      "Hùa theo nhóm bắt nạt",
      "Im lặng đứng xem",
      "Báo giáo viên hoặc can thiệp an toàn",
      "Quay clip"
    ],
    correctIndex: 2,
    explanation: "Can thiệp đúng cách giúp cứu nạn nhân."
  },
  {
    id: "bys-5",
    question: "Khi chứng kiến bạo lực nhưng sợ can thiệp trực tiếp?",
    options: [
      "Im lặng",
      "Tìm người lớn gần nhất hỗ trợ",
      "Cổ vũ kẻ bắt nạt",
      "Quay clip"
    ],
    correctIndex: 1,
    explanation: "An toàn luôn là ưu tiên."
  },

  // 25 câu tiếp ↓

  {
    id: "bys-6",
    question: "Hành vi nào giúp giảm bạo lực?",
    options: [
      "Tách nạn nhân khỏi kẻ bắt nạt (khi an toàn)",
      "Hùa theo",
      "Đứng cười",
      "Quay clip"
    ],
    correctIndex: 0,
    explanation: "Tách nhẹ nhàng khi an toàn giúp giảm leo thang."
  },
  {
    id: "bys-7",
    question: "Tại sao nhiều học sinh không dám can thiệp?",
    options: [
      "Sợ bị trả thù",
      "Thấy bình thường",
      "Không quan tâm",
      "Không hiểu điều gì xảy ra"
    ],
    correctIndex: 0,
    explanation: "Sợ bị trả thù là lý do phổ biến."
  },
  {
    id: "bys-8",
    question: "Hành động lành mạnh khi thấy người bị cyberbully?",
    options: [
      "Thả haha",
      "Bình luận hùa theo",
      "An ủi bạn và báo cáo bài",
      "Share bài"
    ],
    correctIndex: 2,
    explanation: "Hỗ trợ nạn nhân online rất quan trọng."
  },
  {
    id: "bys-9",
    question: "Dạng bystander tiêu cực là?",
    options: [
      "Báo cáo sự việc",
      "Im lặng quan sát",
      "An ủi nạn nhân",
      "Tìm người lớn hỗ trợ"
    ],
    correctIndex: 1,
    explanation: "Im lặng = tiếp tay gián tiếp."
  },
  {
    id: "bys-10",
    question: "Người chứng kiến có thể giúp nạn nhân bằng cách?",
    options: [
      "Nói chuyện để họ không cảm thấy cô đơn",
      "Cười họ",
      "Xa lánh họ",
      "Bỏ mặc"
    ],
    correctIndex: 0,
    explanation: "Hỗ trợ tinh thần giúp giảm tổn thương."
  },
  {
    id: "bys-11",
    question: "Khi thấy bạn bị mỉa mai trong lớp, bạn có thể?",
    options: [
      "Chuyển chủ đề",
      "Xin giáo viên can thiệp",
      "Nhắc nhẹ 'Đừng nói vậy, không hay đâu'",
      "Tất cả"
    ],
    correctIndex: 3,
    explanation: "Những hành động nhỏ giúp giảm căng thẳng."
  },
  {
    id: "bys-12",
    question: "Người chứng kiến có thể giúp phòng ngừa bạo lực bằng?",
    options: [
      "Làm ngơ",
      "Khuyến khích nói xấu",
      "Ủng hộ hành vi tích cực, không cổ vũ bạo lực",
      "Im lặng"
    ],
    correctIndex: 2,
    explanation: "Bystander tích cực là lá chắn quan trọng."
  },
  {
    id: "bys-13",
    question: "Điều an toàn nhất khi chứng kiến đánh nhau?",
    options: [
      "Lao vào đánh luôn",
      "Quay clip",
      "Kêu gọi người lớn/ bảo vệ",
      "Cổ vũ"
    ],
    correctIndex: 2,
    explanation: "Tránh nguy hiểm trực tiếp."
  },
  {
    id: "bys-14",
    question: "Điều gì khiến bạo lực lan rộng?",
    options: [
      "Người chứng kiến im lặng",
      "Nạn nhân chống trả",
      "Giáo viên nghiêm",
      "Bạn bè đoàn kết"
    ],
    correctIndex: 0,
    explanation: "Sự im lặng làm kẻ xấu nghĩ hành vi được chấp nhận."
  },
  {
    id: "bys-15",
    question: "Một hành động nhỏ nhưng hiệu quả của bystander?",
    options: [
      "Đứng sát nạn nhân để họ an tâm",
      "Bỏ đi",
      "Cười theo",
      "Xúi đánh lại"
    ],
    correctIndex: 0,
    explanation: "Hiện diện làm giảm nguy cơ bạo lực."
  },
  {
    id: "bys-16",
    question: "Điều gì giúp bạn can thiệp tốt hơn?",
    options: [
      "Hiểu rõ tình huống và đảm bảo an toàn",
      "Không quan sát gì",
      "Đoán mò",
      "Cổ vũ cái xấu"
    ],
    correctIndex: 0,
    explanation: "Phân tích tình huống giúp phản ứng đúng."
  },
  {
    id: "bys-17",
    question: "Bystander tích cực khác gì với tiêu cực?",
    options: [
      "Dám hành động đúng lúc",
      "Không làm gì",
      "Chỉ xem cho vui",
      "Quay clip"
    ],
    correctIndex: 0,
    explanation: "Hành động đúng lúc giúp cứu người."
  },
  {
    id: "bys-18",
    question: "Hành vi nào là tích cực khi chứng kiến bạo lực tinh thần?",
    options: [
      "Đổi chủ đề",
      "Khuyên mọi người ngừng công kích",
      "Rời đi",
      "Cổ vũ"
    ],
    correctIndex: 1,
    explanation: "Can thiệp bằng lời nói nhẹ nhàng giúp xoa dịu căng thẳng."
  },
  {
    id: "bys-19",
    question: "Khi thấy bạn bị cô lập, bạn nên?",
    options: [
      "Cũng tẩy chay theo",
      "Không quan tâm",
      "Mời bạn vào các hoạt động nhóm",
      "Nói xấu họ"
    ],
    correctIndex: 2,
    explanation: "Hỗ trợ hòa nhập làm giảm tổn thương xã hội."
  },
  {
    id: "bys-20",
    question: "Bystander có thể khiến BLHD nặng hơn nếu?",
    options: [
      "Hùa theo đám đông",
      "Dừng lại lắng nghe",
      "Báo người lớn",
      "Tìm cách hòa giải"
    ],
    correctIndex: 0,
    explanation: "Hùa theo = tiếp tay."
  },
  {
    id: "bys-21",
    question: "Can thiệp an toàn là?",
    options: [
      "Đánh lại",
      "Gào thét",
      "Nhờ người lớn hoặc số đông can thiệp",
      "Đứng xem"
    ],
    correctIndex: 2,
    explanation: "An toàn luôn là ưu tiên."
  },
  {
    id: "bys-22",
    question: "Bystander cần tránh?",
    options: [
      "Lan truyền tin đồn",
      "Đứng cạnh hỗ trợ tinh thần",
      "Nói lời động viên",
      "Đưa nạn nhân đến chỗ an toàn"
    ],
    correctIndex: 0,
    explanation: "Tin đồn làm tổn thương tâm lý."
  },
  {
    id: "bys-23",
    question: "Khi chứng kiến BLHD online, bạn nên?",
    options: [
      "Share bài",
      "Comment chửi lại",
      "Báo cáo bài + nhắn động viên nạn nhân",
      "Tag nhóm lớp vào xem"
    ],
    correctIndex: 2,
    explanation: "Không lan truyền điều tiêu cực."
  },
  {
    id: "bys-24",
    question: "Nạn nhân sẽ cảm thấy đỡ sợ hơn khi?",
    options: [
      "Có một người đứng về phía họ",
      "Cả lớp im lặng",
      "Không ai giúp",
      "Bị cô lập"
    ],
    correctIndex: 0,
    explanation: "Một người đứng lên cũng đủ tạo sức mạnh."
  },
  {
    id: "bys-25",
    question: "Bạn nên tránh can thiệp khi?",
    options: [
      "Kẻ bắt nạt mang hung khí",
      "Bạn có thể nói nhẹ nhàng",
      "Cần gọi thầy cô",
      "Cần gọi bảo vệ"
    ],
    correctIndex: 0,
    explanation: "An toàn là ưu tiên tuyệt đối."
  },
  {
    id: "bys-26",
    question: "Bystander tích cực làm được điều gì?",
    options: [
      "Phòng ngừa BLHD từ sớm",
      "Tăng bạo lực",
      "Không giúp được gì",
      "Gây nguy hiểm"
    ],
    correctIndex: 0,
    explanation: "Can thiệp nhỏ → hiệu quả lớn."
  },
  {
    id: "bys-27",
    question: "Bạn thấy bạn bị troll trong group chat, bạn nên?",
    options: [
      "Cười theo",
      "Nhắc khéo nhóm dừng lại",
      "Spam emoji cười",
      "Thả haha"
    ],
    correctIndex: 1,
    explanation: "Chặn hành vi tiêu cực."
  },
  {
    id: "bys-28",
    question: "Bạn nên báo hiệu BLHD cho ai?",
    options: [
      "Bạn thân",
      "Giáo viên/ Ban giám hiệu",
      "Người lạ online",
      "Không báo ai"
    ],
    correctIndex: 1,
    explanation: "Nhà trường là đơn vị chịu trách nhiệm chính."
  },
  {
    id: "bys-29",
    question: "Điều quan trọng nhất khi can thiệp?",
    options: [
      "An toàn cho bản thân",
      "Gây gổ",
      "Cãi nhau",
      "Tỏ ra mạnh mẽ"
    ],
    correctIndex: 0,
    explanation: "Không được đặt bản thân vào tình huống nguy hiểm."
  },
  {
    id: "bys-30",
    question: "Khi không thể can thiệp trực tiếp, bạn nên?",
    options: [
      "Im lặng",
      "Báo ngay thầy cô hoặc đường dây nóng 111",
      "Quay clip",
      "Rời nhóm"
    ],
    correctIndex: 1,
    explanation: "111 là đường dây quốc gia hỗ trợ trẻ em."
  }
],
"support": [
  {
    id: "sup-1",
    question: "Vai trò của người hỗ trợ nạn nhân BLHD là?",
    options: [
      "Bỏ mặc",
      "Giúp nạn nhân cảm thấy an toàn và không cô đơn",
      "Hùa theo số đông",
      "Chỉ trích nạn nhân"
    ],
    correctIndex: 1,
    explanation: "Hỗ trợ tinh thần giúp nạn nhân hồi phục."
  },
  {
    id: "sup-2",
    question: "Điều đầu tiên cần làm khi bạn thấy bạn bị bắt nạt?",
    options: [
      "Đứng nhìn",
      "Tiếp cận an toàn và đưa bạn ra khỏi tình huống",
      "Chế giễu",
      "Ghi hình đăng mạng"
    ],
    correctIndex: 1,
    explanation: "Ưu tiên an toàn và tách khỏi nơi nguy hiểm."
  },
  {
    id: "sup-3",
    question: "Khi bạn an ủi người bị tổn thương, bạn nên?",
    options: [
      "Nghe họ nói và xác nhận cảm xúc của họ",
      "Chê họ yếu đuối",
      "Nói 'Không có gì đâu'",
      "Đổi chủ đề ngay"
    ],
    correctIndex: 0,
    explanation: "Xác nhận cảm xúc giúp họ cảm thấy được tôn trọng."
  },
  {
    id: "sup-4",
    question: "Nếu nạn nhân không muốn nói chuyện, bạn nên?",
    options: [
      "Ép nói",
      "Cho họ không gian và nói rằng bạn luôn sẵn sàng khi họ cần",
      "Bỏ đi",
      "Cười nhạo"
    ],
    correctIndex: 1,
    explanation: "Tôn trọng ranh giới của họ."
  },
  {
    id: "sup-5",
    question: "Điều gì giúp nạn nhân sớm hồi phục?",
    options: [
      "Được lắng nghe và hỗ trợ đúng cách",
      "Cô lập họ",
      "Tạo áp lực",
      "Kể lại chuyện cũ nhiều lần"
    ],
    correctIndex: 0,
    explanation: "Lắng nghe đúng cách rất quan trọng."
  },

  // 25 câu tiếp theo ↓

  {
    id: "sup-6",
    question: "Khi bạn hỗ trợ nạn nhân BLHD, điều nên tránh?",
    options: [
      "Đổ lỗi nạn nhân",
      "Lắng nghe họ",
      "Động viên nhỏ nhẹ",
      "Đưa họ đến người lớn tin cậy"
    ],
    correctIndex: 0,
    explanation: "Không bao giờ được đổ lỗi nạn nhân."
  },
  {
    id: "sup-7",
    question: "Nạn nhân cảm thấy tốt hơn khi?",
    options: [
      "Có người đứng về phía họ",
      "Ai cũng im lặng",
      "Bị chế giễu",
      "Bị cô lập"
    ],
    correctIndex: 0,
    explanation: "Một người hỗ trợ cũng tạo hiệu ứng lớn."
  },
  {
    id: "sup-8",
    question: "Lời nói nào KHÔNG giúp ích cho nạn nhân?",
    options: [
      "Tớ tin cậu",
      "Cậu không một mình",
      "Có gì đâu mà buồn?",
      "Tớ ở đây nếu cậu cần"
    ],
    correctIndex: 2,
    explanation: "Xem nhẹ cảm xúc là điều tối kỵ."
  },
  {
    id: "sup-9",
    question: "Một cách hỗ trợ tâm lý cho nạn nhân là?",
    options: [
      "Nói chuyện nhẹ nhàng, không phán xét",
      "Cười nhạo",
      "Kể lại toàn bộ câu chuyện cho người khác",
      "Kệ họ"
    ],
    correctIndex: 0,
    explanation: "Hỗ trợ tinh thần phải nhẹ nhàng và kín đáo."
  },
  {
    id: "sup-10",
    question: "Bạn nên làm gì khi thấy bạn trở nên thu mình sau sự việc?",
    options: [
      "Gặp gỡ, khuyến khích họ chia sẻ",
      "Chê họ yếu",
      "Bỏ mặc",
      "Nói chuyện cộc lốc"
    ],
    correctIndex: 0,
    explanation: "Sự quan tâm giúp họ cảm thấy được kết nối."
  },
  {
    id: "sup-11",
    question: "Người hỗ trợ nên?",
    options: [
      "Giữ bí mật câu chuyện nếu nạn nhân yêu cầu và không nguy hiểm",
      "Kể hết cho cả lớp",
      "Đăng story",
      "Chê bai"
    ],
    correctIndex: 0,
    explanation: "Bí mật giúp nạn nhân cảm thấy được tôn trọng."
  },
  {
    id: "sup-12",
    question: "Khi một bạn bị stress vì bị tẩy chay, bạn nên?",
    options: [
      "Tham gia tẩy chay",
      "Nói chuyện và rủ bạn tham gia hoạt động cùng nhóm",
      "Tránh xa",
      "Đổ lỗi"
    ],
    correctIndex: 1,
    explanation: "Kết nối xã hội giúp giảm stress."
  },
  {
    id: "sup-13",
    question: "Điều gì KHÔNG phải hỗ trợ?",
    options: [
      "Nói chuyện riêng để họ không ngại",
      "Bắt buộc họ kể mọi chuyện",
      "Đi cùng họ đến phòng tư vấn",
      "Báo giáo viên khi cần"
    ],
    correctIndex: 1,
    explanation: "Không được ép buộc họ chia sẻ."
  },
  {
    id: "sup-14",
    question: "Nạn nhân BLHD thường cảm thấy?",
    options: [
      "Được nhiều người ủng hộ",
      "Xấu hổ, lo lắng, cô lập",
      "Tự tin hơn",
      "Không cảm xúc"
    ],
    correctIndex: 1,
    explanation: "Họ cần sự đồng hành để vượt qua."
  },
  {
    id: "sup-15",
    question: "Bạn có thể hỗ trợ bằng cách?",
    options: [
      "Nói 'Tớ ở đây cùng cậu'",
      "Làm lơ họ",
      "Hùa theo số đông",
      "Im lặng"
    ],
    correctIndex: 0,
    explanation: "Sự hiện diện là cách hỗ trợ quan trọng."
  },
  {
    id: "sup-16",
    question: "Khi thấy bạn bị BLHD online, bạn nên?",
    options: [
      "Thả haha",
      "Động viên + báo cáo nội dung xấu",
      "Share clip",
      "Tag nhóm vào"
    ],
    correctIndex: 1,
    explanation: "Không lan truyền nội dung tổn thương."
  },
  {
    id: "sup-17",
    question: "Lời nói nào giúp nạn nhân cảm thấy được thấu hiểu?",
    options: [
      "Cậu mạnh mẽ thật",
      "Cậu làm quá rồi đó",
      "Cậu không một mình, tớ ở đây khi cậu cần",
      "Quên đi"
    ],
    correctIndex: 2,
    explanation: "Lời nói hỗ trợ phải chân thành và thấu cảm."
  },
  {
    id: "sup-18",
    question: "Một cách giúp bạn vượt qua nỗi sợ sau khi bị bắt nạt?",
    options: [
      "Trò chuyện với người lớn tin cậy",
      "Im lặng chịu đựng",
      "Dấu nhẹm",
      "Không cầu cứu ai"
    ],
    correctIndex: 0,
    explanation: "Người lớn có thể giúp nạn nhân an toàn hơn."
  },
  {
    id: "sup-19",
    question: "Khi nạn nhân muốn bỏ học vì sợ, bạn nên?",
    options: [
      "Chê họ yếu",
      "Lắng nghe và khuyến khích tìm hỗ trợ chuyên môn",
      "Bảo họ chịu đựng",
      "Bỏ mặc"
    ],
    correctIndex: 1,
    explanation: "Cần giúp họ kết nối với chuyên gia."
  },
  {
    id: "sup-20",
    question: "Một bạn bị chế ảnh trên mạng, bạn nên?",
    options: [
      "Chia sẻ cho vui",
      "Động viên + báo cáo bài chế",
      "Cmt haha",
      "Không quan tâm"
    ],
    correctIndex: 1,
    explanation: "Lan truyền chỉ làm tổn thương nặng hơn."
  },
  {
    id: "sup-21",
    question: "Hỗ trợ tinh thần KHÔNG phải là?",
    options: [
      "Lắng nghe",
      "Chê bai để họ mạnh mẽ hơn",
      "Đồng hành",
      "An ủi"
    ],
    correctIndex: 1,
    explanation: "Chê bai không bao giờ giúp hồi phục."
  },
  {
    id: "sup-22",
    question: "Bạn có thể đưa nạn nhân đến đâu để được giúp?",
    options: [
      "Phòng tư vấn tâm lý",
      "Căn tin",
      "Nhà vệ sinh",
      "Bãi xe"
    ],
    correctIndex: 0,
    explanation: "Phòng tư vấn là nơi có chuyên môn."
  },
  {
    id: "sup-23",
    question: "Khi bạn lo lắng cho nạn nhân, bạn nên?",
    options: [
      "Hỏi thăm đều đặn",
      "Tránh xa",
      "Đổ lỗi",
      "Gây áp lực"
    ],
    correctIndex: 0,
    explanation: "Hỏi thăm thể hiện sự quan tâm."
  },
  {
    id: "sup-24",
    question: "Nếu nạn nhân bị BLHD trong thời gian dài, bạn nên?",
    options: [
      "Báo giáo viên hoặc người lớn",
      "Kệ",
      "Cổ vũ",
      "Trốn tránh"
    ],
    correctIndex: 0,
    explanation: "Can thiệp sớm giúp bảo vệ nạn nhân."
  },
  {
    id: "sup-25",
    question: "Nạn nhân dễ vượt qua tổn thương hơn khi?",
    options: [
      "Có mạng lưới bạn bè hỗ trợ",
      "Ở một mình",
      "Không ai quan tâm",
      "Bị chế giễu"
    ],
    correctIndex: 0,
    explanation: "Kết nối xã hội là yếu tố hồi phục quan trọng."
  },
  {
    id: "sup-26",
    question: "Điều nên làm khi bạn thấy nạn nhân sợ đến lớp?",
    options: [
      "Nói chuyện cùng họ",
      "Ép họ phải mạnh mẽ",
      "Cười họ",
      "Bỏ mặc"
    ],
    correctIndex: 0,
    explanation: "Hỗ trợ tâm lý giúp họ đối diện nỗi sợ."
  },
  {
    id: "sup-27",
    question: "Bạn hỗ trợ nạn nhân bằng cách?",
    options: [
      "Giữ bí mật",
      "Đăng lên mạng để mọi người biết",
      "Tẩy chay họ",
      "Bắt họ kể lại"
    ],
    correctIndex: 0,
    explanation: "Tôn trọng quyền riêng tư."
  },
  {
    id: "sup-28",
    question: "Nếu nạn nhân bị tổn thương nặng, bạn nên?",
    options: [
      "Khuyến khích họ đến gặp chuyên gia tâm lý",
      "Bảo họ quên đi",
      "Bỏ mặc",
      "Cười cho vui"
    ],
    correctIndex: 0,
    explanation: "Chuyên gia tâm lý có thể hỗ trợ phục hồi."
  },
  {
    id: "sup-29",
    question: "Điều KHÔNG giúp ích cho nạn nhân?",
    options: [
      "Chê họ yếu",
      "Ở bên họ",
      "Lắng nghe",
      "Giữ sự an toàn cho họ"
    ],
    correctIndex: 0,
    explanation: "Chỉ trích khiến họ tổn thương thêm."
  },
  {
    id: "sup-30",
    question: "Bạn nên hỗ trợ nạn nhân ngay cả khi?",
    options: [
      "Bạn không thân với họ",
      "Bạn ghét họ",
      "Bạn không biết họ là ai",
      "Tất cả"
    ],
    correctIndex: 3,
    explanation: "Hỗ trợ là trách nhiệm xã hội, không phụ thuộc mức độ thân quen."
  }
],


  // TODO: các chủ đề còn lại: online-safety, empathy, bystander, support
};

/* ----------------- DANH SÁCH CHỦ ĐỀ HIỂN THỊ TRÊN UI ----------------- */

export const quizTopics: QuizTopic[] = [
  {
    id: "cyberbullying",
    name: "Bạo lực mạng",
    icon: "💻",
    description: "Nhận diện – phòng tránh bạo lực trên mạng xã hội.",
    questions: questionsByTopic["cyberbullying"],
  },
  {
    id: "school-violence",
    name: "Bạo lực trong trường",
    icon: "🏫",
    description: "Các tình huống bạo lực xảy ra trong lớp, trong trường.",
    questions: questionsByTopic["school-violence"],
  },
  {
    id: "law-rights",
    name: "Luật & Quyền trẻ em",
    icon: "⚖️",
    description: "Quyền trẻ em, trách nhiệm pháp lý khi xảy ra bạo lực.",
    questions: questionsByTopic["law-rights"],
  },
  {
    id: "mental-health",
    name: "Sức khỏe tinh thần",
    icon: "🧠",
    description: "Hiểu về stress, trầm cảm, FOMO và cách chăm sóc bản thân.",
    questions: questionsByTopic["mental-health"],
  },
  {
    id: "communication",
    name: "Kỹ năng giao tiếp",
    icon: "🗣️",
    description: "Nói sao cho không làm người khác tổn thương.",
    questions: questionsByTopic["communication"],
  },
  {
    id: "conflict",
    name: "Giải quyết mâu thuẫn",
    icon: "🤝",
    description: "Học cách xử lý xung đột mà không dùng bạo lực.",
    questions: questionsByTopic["conflict"],
  },
  {
    id: "online-safety",
    name: "An toàn trên mạng",
    icon: "🛡️",
    description: "Tránh bị lừa đảo, quấy rối và bắt nạt online.",
    questions: questionsByTopic["online-safety"],
  },
  {
    id: "empathy",
    name: "Thấu cảm",
    icon: "💗",
    description: "Hiểu cảm xúc người khác để giảm hành vi gây tổn thương.",
    questions: questionsByTopic["empathy"],
  },
  {
    id: "bystander",
    name: "Người chứng kiến",
    icon: "👀",
    description: "Học cách hành động khi chứng kiến bạo lực học đường.",
    questions: questionsByTopic["bystander"],
  },
  {
    id: "support",
    name: "Hỗ trợ bạn bè",
    icon: "🫂",
    description: "Cách đứng bên cạnh và hỗ trợ nạn nhân bạo lực.",
    questions: questionsByTopic["support"],
  },

];
