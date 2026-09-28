document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) return;

  function setActiveLink(id) {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-40% 0px -55% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
});

document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".proses-step");
  const detail = document.querySelector(".proses-detail");

  if (!steps.length || !detail) return;

  const prosesData = [
    {
      title: "Pohon Sagu",
      image: "assets/images/proses-pohon-sagu.jpg",
      alt: "Pohon sagu yang siap dipanen",
      desc: "Pohon sagu (Metroxylon sagu) umumnya dipilih pada usia 8–12 tahun, ketika kandungan pati di dalam batang telah mencapai titik maksimal. Salah satu tanda bahwa pohon telah memasuki masa siap panen adalah munculnya kuncup bunga pada bagian pucuk. Pada tahap ini, batang sagu memiliki cadangan pati yang cukup tinggi sehingga lebih optimal untuk diolah menjadi tepung sagu. Setelah pohon yang sesuai dipilih, batang kemudian ditebang dan dipersiapkan untuk memasuki tahap pengolahan berikutnya, yaitu pengupasan dan pengambilan empulur.",
    },
    {
      title: "Penebangan",
      image: "assets/images/proses-penebangan.jpg",
      alt: "Batang pohon sagu yang sedang ditebang",
      desc: "Pohon sagu yang telah siap panen ditebang menggunakan kapak atau gergaji pada bagian pangkal batang, dekat permukaan tanah. Setelah rebah, pelepah dan daunnya dibersihkan, lalu batang dipotong menjadi beberapa gelondong sepanjang 1–2 meter agar mudah diangkut. Gelondong ini biasanya dihanyutkan melalui sungai atau kanal menuju tempat pengolahan. Penebangan dilakukan secara selektif sehingga anakan sagu di sekitarnya tetap tumbuh dan hutan sagu dapat terus lestari.",
    },
    {
      title: "Pengambilan Empulur",
      image: "assets/images/proses-empulur.jpg",
      alt: "Empulur batang sagu yang sedang diparut",
      desc: "Gelondong batang sagu dibelah memanjang untuk membuka bagian dalamnya. Empulur, yaitu jaringan lunak berwarna putih kekuningan yang menyimpan pati, kemudian dipangkur atau diparut menggunakan alat tradisional dari kayu atau bambu hingga menjadi serpihan halus. Di beberapa daerah, proses ini kini dibantu mesin parut agar lebih cepat. Serpihan empulur yang dihasilkan ditampung dan siap dibawa ke tahap penyaringan untuk memisahkan pati dari seratnya.",
    },
    {
      title: "Penyaringan",
      image: "assets/images/proses-penyaringan.jpg",
      alt: "Proses penyaringan pati sagu dengan air",
      desc: "Serpihan empulur dicampur dengan air, lalu diremas dan diinjak di atas saringan kain yang dipasang pada wadah dari pelepah sagu. Air yang membawa butiran pati mengalir dan tertampung di bak pengendapan, sedangkan ampas serat tertinggal di atas saringan. Proses ini diulang beberapa kali hingga pati benar-benar terpisah. Setelah didiamkan, pati akan mengendap di dasar wadah dan air di atasnya dibuang secara perlahan.",
    },
    {
      title: "Pengeringan",
      image: "assets/images/proses-pengeringan.jpg",
      alt: "Pati sagu yang sedang dijemur di bawah sinar matahari",
      desc: "Endapan pati sagu yang masih basah diambil dan dijemur di bawah sinar matahari di atas tikar atau nampan lebar. Selama pengeringan, pati diratakan dan dibalik secara berkala agar kering merata dan tidak berjamur. Proses ini dapat berlangsung satu hingga beberapa hari tergantung cuaca. Kadar air yang rendah membuat tepung sagu lebih awet disimpan, meskipun sebagian masyarakat juga menyimpan sagu basah yang dibungkus daun dalam wadah tumang.",
    },
    {
      title: "Tepung Sagu",
      image: "assets/images/proses-tepung-sagu.jpg",
      alt: "Tepung sagu putih yang sudah jadi",
      desc: "Pati yang telah kering kemudian ditumbuk atau digiling hingga halus, lalu diayak untuk menghasilkan tepung sagu yang putih dan lembut. Tepung ini dikemas dalam karung atau wadah tertutup agar terhindar dari kelembapan. Tepung sagu kaya karbohidrat, bebas gluten, dan dapat disimpan dalam waktu lama. Selain untuk konsumsi rumah tangga, tepung sagu juga dijual ke pasar dan menjadi bahan baku berbagai industri pangan.",
    },
    {
      title: "Penyajian",
      image: "assets/images/proses-penyajian.jpg",
      alt: "Hidangan olahan sagu yang siap disantap",
      desc: "Tepung sagu siap diolah menjadi beragam hidangan khas Nusantara. Di Papua dan Maluku, sagu diseduh dengan air panas menjadi papeda yang kental dan disantap bersama ikan kuah kuning. Sagu juga dipanggang menjadi sagu lempeng, dibuat bagea yang renyah, hingga diolah menjadi kapurung khas Sulawesi. Keragaman olahan ini menunjukkan bahwa sagu bukan sekadar bahan pangan, melainkan bagian penting dari budaya masyarakat Indonesia timur.",
    },
  ];

  const image = detail.querySelector(".proses-detail-image");
  const badge = detail.querySelector(".proses-detail-badge");
  const number = detail.querySelector(".proses-detail-number");
  const title = detail.querySelector(".proses-detail-title");
  const desc = detail.querySelector(".proses-detail-desc");

  // muat semua foto lebih dulu supaya pergantian foto tidak berkedip
  prosesData.forEach((item) => {
    new Image().src = item.image;
  });

  let currentStep = 0;
  let changeTimer;

  function showStep(index) {
    if (index === currentStep) return;
    currentStep = index;

    steps.forEach((step, i) => {
      step.classList.toggle("active", i === index);
      step.setAttribute("aria-pressed", i === index);
    });

    const data = prosesData[index];
    const stepNumber = String(index + 1).padStart(2, "0");

    detail.classList.add("is-changing");
    clearTimeout(changeTimer);

    changeTimer = setTimeout(() => {
      image.src = data.image;
      image.alt = data.alt;
      badge.textContent = `Langkah ${index + 1} dari ${prosesData.length}`;
      number.textContent = `${stepNumber} — ${data.title}`;
      title.textContent = data.title;
      desc.textContent = data.desc;
      detail.classList.remove("is-changing");
    }, 200);
  }

  steps.forEach((step, i) => {
    step.setAttribute("aria-pressed", i === 0);
    step.addEventListener("click", () => showStep(i));
  });
});
