import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [likes, setLikes] = useState({});
  const [likedPhotos, setLikedPhotos] = useState(new Set());
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [headerStyle, setHeaderStyle] = useState({
    color: '#ffffff'
  });

  const names = ['Марина', 'Дима', 'Лиза', 'Артём', 'Света', 'Катя', 'Никита', 'Аня', 'Павел', 'Юля'];

  
  const categoryStyles = {
    'all': {
      backgroundImage: "url('https://i.pinimg.com/736x/98/77/1d/98771dfaefd2d50a8ee93d2f70ed87aa.jpg')",
      color: '#ffffff'
    },
    'architecture': {
      backgroundImage: "url('https://i.pinimg.com/1200x/b0/a6/6d/b0a66dc04cbcd5d0013e725c1c410608.jpg')",
      color: '#352828ff'
    },
    'nature': {
      backgroundImage: "url('https://i.pinimg.com/736x/9a/9c/c7/9a9cc7f2dfab53d5660c7fe12d465a7d.jpg')",
      color: '#d7e4daff'
    },
    'people': {
      backgroundImage: "url('https://i.pinimg.com/736x/eb/90/63/eb9063435d1252991e30082e4e293b48.jpg')",
      color: '#c44536'
    },
    'animals': {
      backgroundImage: "url('https://i.pinimg.com/1200x/eb/3f/9a/eb3f9af272d64aa3b01ecd8257c4483e.jpg')",
      color: '#ffffffff'
    }
  };

  const updateUrl = (category) => {
    const newUrl = category === 'all' 
      ? window.location.pathname 
      : `${window.location.pathname}#${category}`;
    window.history.replaceState(null, null, newUrl);
  };

  const getCategoryFromUrl = () => {
    const hash = window.location.hash.substring(1);
    return ['all', 'architecture', 'nature', 'people', 'animals'].includes(hash) 
      ? hash 
      : 'all';
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setHeaderStyle(categoryStyles[cat]);
    updateUrl(cat);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const category = getCategoryFromUrl();
      setActiveCategory(category);
      setHeaderStyle(categoryStyles[category]);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  
  const commentsByCategory = {
    architecture: [
      'Какая величественная постройка!',
      'Обожаю такие старинные здания',
      'Фото передаёт всю архитектурную красоту',
      'Это шедевр архитектуры!',
      'Такие детали — просто волшебство',
      'Очень атмосферное освещение',
      'Хочется побывать в таком месте',
      'Здание выглядит как из сказки',
      'Отличная композиция и ракурс',
      'Великолепная работа!',
      'Стиль здания — просто бомба',
      'Красиво! Особенно окна и балконы',
      'Как будто попал в Париж',
      'Архитектура вдохновляет',
      'Фото передаёт дух города',
      'Очень гармоничный кадр',
      'Красиво! Особенно в лучах заката',
      'Здание выглядит очень мощно',
      'Такие здания нужно беречь',
      'Фотография — как картина'
    ],
    nature: [
      'Какая красота природы!',
      'Очень атмосферное фото',
      'Такое место — мечта для прогулок',
      'Прекрасный пейзаж!',
      'Хочется оказаться там прямо сейчас',
      'Видно, как природа дышит',
      'Такое спокойствие передаётся',
      'Очень живописно!',
      'Лес выглядит таинственно',
      'Озеро как зеркало',
      'Невероятная глубина кадра',
      'Закат просто фантастический',
      'Солнечные лучи — волшебство',
      'Такое место — рай для души',
      'Очень гармонично и умиротворяюще',
      'Как будто попал в другой мир',
      'Природа вдохновляет',
      'Такое фото можно вешать в рамку',
      'Очень красиво и чисто',
      'Это мечта!'
    ],
    people: [
      'Очень выразительный взгляд',
      'Такое искреннее выражение лица',
      'Фото передаёт эмоцию',
      'Красивый портрет!',
      'Чувствуется душа человека',
      'Отличная игра света и тени',
      'Такой живой и настояческий кадр',
      'Фото дышит эмоциями',
      'Очень естественно и красиво',
      'Ты умеешь ловить момент',
      'Глаза — как окно в душу',
      'Такой сильный портрет',
      'Очень атмосферное фото',
      'Видно, что человек расслаблен',
      'Прекрасная работа!',
      'Ты ловишь самое настоящее',
      'Такое фото — искусство',
      'Фотография — как история',
      'Очень трогательно',
      'Без слов — просто красиво'
    ],
    animals: {
      MyCat: [
        'КАКОЙ КРАСИВЫЙ КОТ!!! 💗💗',
        'Какие глазки — просто загорелись! ✨😻',
        'Милашка на миллион! Хочу такого же! 🥺',
        '♡ ̆̈ Это не кот, это ангелочек в кошачьей шубке!',
        '⋆˙⟡♡ Такой окрас — просто волшебство природы!',
        'У меня тоже есть котик, но этот — особенный! 💚',
        'Этот взгляд сводит с ума! 😍',
        'Лапки, носик, глазки — всё идеально! 🐾',
        'Просто сижу и таю от умиления... 💘',
        'Если бы котики были конфетками, этот был бы самым вкусным! 🍬',
        'Он не просто красивый — он божественный! 🌟',
        'Такой пушистый комочек счастья! 🥰',
        'Фото дня, месяца, года! 👑',
        'Где такого взять? Продаётся? 😅',
        'Он смотрит — и сердце перестаёт биться от восторга! 💓',
        'Этот котик заслуживает отдельной выставки! 🖼️',
        'Я бы смотрела на него вечно... 🌙',
        'Лучший кот в мире, без вариантов! 🏆',
        'Такой котик лечит душу и сердце ❤️‍🩹',
        'Все коты хороши, но этот — вне конкуренции! 💯'
      ],
      кошки: [
        'Какая милая кошечка!',
        'Ой, она такая пушистая!',
        'Я в восторге от этой кисы',
        'Такие глаза — просто сердце тает',
        'Кошка выглядит очень мечтательно',
        'Она будто смотрит в душу',
        'Какая красотка!',
        'Хочу такую же кошку',
        'Она выглядит как королева',
        'Такая грациозная поза',
        'Просто обожаю таких кошек',
        'Она будто улыбается',
        'Красивейшая кошка!',
        'Такое фото — счастье',
        'Она выглядит очень умной',
        'Пушистая и милая — идеально!',
        'Такой взгляд — волшебство',
        'Она будто из сказки',
        'Обожаю её усы!',
        'Красотка!'
      ],
      собаки: [
        'Какой хороший мальчик!',
        'Он выглядит очень умным',
        'Такой преданный взгляд',
        'Обожаю далматинцев!',
        'Он будто улыбается',
        'Такой игривый и весёлый',
        'Какой красивый питомец!',
        'Он выглядит очень счастливым',
        'Такой пушистый и добрый',
        'Собака — лучший друг человека',
        'Он выглядит очень гордым',
        'Такой классный окрас!',
        'Обожаю его пятна',
        'Он будто позирует',
        'Такой мильный пёсик',
        'Он выглядит очень игривым',
        'Такой красивый и умный',
        'Он просто сияе',
        'Такой добрый взгляд',
        'Он — идеальный друг'
      ],
      лисы: [
        'Какая изящная лисичка!',
        'Она выглядит очень хитрой',
        'Такой пушистый хвост — волшебство',
        'Она будто из лесной сказки',
        'Очень красивый окрас',
        'Такая грациозная и ловкая',
        'Лиса выглядит очень умной',
        'Она будто наблюдает за тобой',
        'Такой взгляд — магия',
        'Она выглядит очень гордой',
        'Пушистая и красивая',
        'Она будто танцует',
        'Такое фото — редкость',
        'Она выглядит очень дикой и свободной',
        'Такая сильная и красивая',
        'Она — королева леса',
        'Такой хвост — просто бомба',
        'Она выглядит очень загадочно',
        'Такое фото — сокровище',
        'Она — волшебство природы'
      ],
      панды: [
        'Какая милая панда!',
        'Она выглядит так забавно',
        'Такой пушистый комочек счастья',
        'Она будто улыбается',
        'Панда ест бамбук — это очаровательно',
        'Такой добродушный взгляд',
        'Она выглядит очень ленивой и счастливой',
        'Просто обожаю панд!',
        'Она — самая милая',
        'Такое фото поднимает настроение',
        'Она будто с мультика',
        'Такой пушистый и добрый зверёк',
        'Она выглядит очень расслабленной',
        'Панда — символ мира',
        'Такое фото — счастье',
        'Она выглядит очень игриво',
        'Такой чёрно-белый окрас — идеален',
        'Она — королева мультфильмов',
        'Такой взгляд — магия',
        'Она — просто пушинка'
      ],
      лошади: [
        'Какие величественные лошади!',
        'Они такие грациозные и сильные',
        'Лошади на лугу — это так красиво',
        'Какая мощь и элегантность!',
        'Они выглядят такими свободными',
        'Лошади — самые благородные животные',
        'Какая красивая грива!',
        'Они будто танцуют на лугу',
        'Такой живописный кадр',
        'Лошади — это воплощение красоты',
        'Они выглядят так гармонично',
        'Какая невероятная грация!',
        'Лошади на закате — это волшебно',
        'Они такие сильные и нежные одновременно',
        'Какое красивое стадо!',
        'Лошади — настоящие друзья человека',
        'Они выглядят такими счастливыми',
        'Какая идеальная композиция!',
        'Лошади — это поэзия в движении',
        'Они просто великолепны!'
      ],
      другие: [
        'Какое милое животное!',
        'Очень красивое фото',
        'Такое милое создание!',
        'Прекрасный кадр!',
        'Животные — это чудо',
        'Очень трогательное фото',
        'Какая красота!',
        'Такой милый взгляд',
        'Животные делают мир лучше',
        'Очень душевное фото',
        'Какое прекрасное существо!',
        'Фото передаёт всю красоту природы',
        'Очень атмосферно',
        'Животные — наши лучшие друзья',
        'Какая нежность!',
        'Очень гармоничный кадр',
        'Животные вдохновляют',
        'Такой пушистый комочек счастья',
        'Очень красиво и естественно',
        'Животные — это настоящее чудо'
      ]
    }
  };

  
  const photos = [
    { id: 1, category: 'architecture', src: 'https://i.pinimg.com/736x/6b/c6/10/6bc610ccc015ef7fa26780003109ec88.jpg', likes: 12033, alt: 'Эйфелевая башня' },
    { id: 2, category: 'architecture', src: 'https://i.pinimg.com/1200x/6c/da/54/6cda54bd8a74a541f6643125bc66db6a.jpg', likes: 2174, alt: 'Токио' },
    { id: 3, category: 'architecture', src: 'https://i.pinimg.com/736x/36/82/35/36823531ede1c2ef0a52064c69a93332.jpg', likes: 1577, alt: 'Япония, здание в стиле' },
    { id: 4, category: 'architecture', src: 'https://i.pinimg.com/736x/7c/b2/c9/7cb2c90cee1b9dd23e17fa4c8ddea0dc.jpg', likes: 1820, alt: 'Дворцовый мост' },
    { id: 5, category: 'architecture', src: 'https://i.pinimg.com/1200x/3d/a2/2a/3da22a246fcb45d7585b74401fa084c2.jpg', likes: 3550, alt: 'Москва-Сити' },

    { id: 6, category: 'nature', src: 'https://i.pinimg.com/1200x/7f/e4/20/7fe42026a9f21b53bd5e6df4303423bb.jpg', likes: 1350, alt: 'Лес вид вверх' },
    { id: 7, category: 'nature', src: 'https://i.pinimg.com/736x/dc/1a/91/dc1a917c3a4860887f9c89c0345e0292.jpg', likes: 1722, alt: 'Озеро в горах' },
    { id: 8, category: 'nature', src: 'https://i.pinimg.com/736x/d9/e0/09/d9e00996575cc3ec05bbc36be4ff2042.jpg', likes: 1433, alt: 'Сакура и книга' },
    { id: 9, category: 'nature', src: 'https://i.pinimg.com/736x/cb/89/fc/cb89fc3ac1c3a1d61e4762bd9e03fe6a.jpg', likes: 1940, alt: 'Речка с камнями в лесу' },
    { id: 10, category: 'nature', src: 'https://i.pinimg.com/736x/0d/ec/b0/0decb085cf9ad187d8f637bc42ab6aed.jpg', likes: 2220, alt: 'Красивый пейзаж с цветами в поле' },
    { id: 11, category: 'nature', src: 'https://i.pinimg.com/1200x/19/2a/ec/192aeccaef61a979d339d9dc521fa219.jpg', likes: 1440, alt: 'Цветы с книгой' },
    { id: 12, category: 'nature', src: 'https://i.pinimg.com/736x/29/cb/64/29cb64bc01849d9dccb8d7af177fd416.jpg', likes: 24530, alt: 'Закат в поле' },

    { id: 13, category: 'people', src: 'https://i.pinimg.com/736x/7d/d5/39/7dd539c448579c6093bb2368321628b3.jpg', likes: 1230, alt: 'Модель с черепашкой' },
    { id: 14, category: 'people', src: 'https://i.pinimg.com/1200x/aa/95/dc/aa95dc33f16ee2d9cc2189e61434b5aa.jpg', likes: 1240, alt: 'Модель' },
    { id: 15, category: 'people', src: 'https://i.pinimg.com/736x/c3/16/78/c316780894aa4d863808f6f755e65d5d.jpg', likes: 1770, alt: 'Кореянка' },
    { id: 16, category: 'people', src: 'https://i.pinimg.com/1200x/67/90/96/6790963d1e4402f72b47789fe73c1477.jpg', likes: 1470, alt: 'Студия1' },
    { id: 17, category: 'people', src: 'https://i.pinimg.com/736x/0b/3e/94/0b3e94f540c89db65a81fb49e63b7f62.jpg', likes: 1650, alt: 'Студия2' },
    { id: 18, category: 'people', src: 'https://i.pinimg.com/1200x/66/fa/55/66fa55f2848485919c30c8d48ad06316.jpg', likes: 2650, alt: 'Студия3' },

    { id: 19, category: 'animals', src: 'https://i.pinimg.com/736x/da/a0/18/daa018275ddc5c84895ea8f9e48548be.jpg', likes: 2103, alt: 'Лошадки на лугу' },
    { id: 20, category: 'animals', src: 'https://i.pinimg.com/736x/1c/4e/29/1c4e29f9140f17129ed7d8c5d9a6ce85.jpg', likes: 1803, alt: 'Лиса с птичкой на носу' },
    { id: 21, category: 'animals', src: 'https://i.pinimg.com/736x/f5/b3/f4/f5b3f46fa487b61e48accdcca5d9b3e5.jpg', likes: 1904, alt: 'Мечтательный кот' },
    { id: 22, category: 'animals', src: 'https://i.pinimg.com/736x/ec/c7/4f/ecc74f5e0fcdc2c97be045111cd98a4b.jpg', likes: 2300, alt: 'Кот и закат' },
    { id: 23, category: 'animals', src: 'https://i.pinimg.com/736x/fc/86/1c/fc861cb83a92c8dd62f61446fbfdc0cc.jpg', likes: 1703, alt: 'Далматинец' },
    { id: 24, category: 'animals', src: 'https://i.pinimg.com/736x/c1/8f/e9/c18fe9d8618b7be34ff7aa36e57abc3c.jpg', likes: 1790, alt: 'Шпиц' },
    { id: 25, category: 'animals', src: 'https://i.pinimg.com/736x/10/af/11/10af11672fd2c25a8bc2b5d545b5e26b.jpg', likes: 1730, alt: 'Миниатюрный пудель' },
    { id: 26, category: 'animals', src: 'https://i.pinimg.com/736x/ee/d9/28/eed928c1c071107ff2c39d16b085a640.jpg', likes: 1770, alt: 'Панда в зоопарке' },
    { id: 27, category: 'animals', src: '/images/cat.jpg', likes: 4776, alt: 'Котик' }
  ];

  useEffect(() => {
    const initialLikes = {};
    photos.forEach(photo => {
      initialLikes[photo.id] = photo.likes;
    });
    setLikes(initialLikes);

    const initialComments = {};
    photos.forEach(photo => {
      let categoryComments = [];
      
      if (photo.category === 'animals') {
        if (photo.id === 27) {
          categoryComments = commentsByCategory.animals.MyCat;
        } 
        else if (photo.alt.toLowerCase().includes('кошк') || photo.alt.toLowerCase().includes('кот')) {
          categoryComments = commentsByCategory.animals.кошки;
        } else if (photo.alt.toLowerCase().includes('собак') || photo.alt.toLowerCase().includes('далматинец') || photo.alt.toLowerCase().includes('питомец') || photo.alt.toLowerCase().includes('шпиц') || photo.alt.toLowerCase().includes('пудель')) {
          categoryComments = commentsByCategory.animals.собаки;
        } else if (photo.alt.toLowerCase().includes('лис')) {
          categoryComments = commentsByCategory.animals.лисы;
        } else if (photo.alt.toLowerCase().includes('панда')) {
          categoryComments = commentsByCategory.animals.панды;
        } else if (photo.alt.toLowerCase().includes('лошад')) {
          categoryComments = commentsByCategory.animals.лошади;
        } else {
          categoryComments = commentsByCategory.animals.другие;
        }
      } else {
        categoryComments = commentsByCategory[photo.category] || commentsByCategory.animals.другие;
      }

      const count = Math.floor(Math.random() * 15) + 10;
      initialComments[photo.id] = Array.from({ length: count }, (_, i) => {
        const commentText = categoryComments[Math.floor(Math.random() * categoryComments.length)];
        const author = names[Math.floor(Math.random() * names.length)];
        return {
          id: i + 1,
          text: commentText,
          author,
          date: new Date(Date.now() - Math.random() * 1000000000).toLocaleDateString()
        };
      });
    });
    setComments(initialComments);
    
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const handleLike = (id) => {
    if (likedPhotos.has(id)) {
      setLikedPhotos(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      setLikes(prev => ({
        ...prev,
        [id]: prev[id] - 1
      }));
    } else {
      setLikedPhotos(prev => new Set(prev).add(id));
      setLikes(prev => ({
        ...prev,
        [id]: prev[id] + 1
      }));
    }
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      text: newComment,
      author: 'Анна Иванова',
      date: new Date().toLocaleDateString()
    };
    setComments(prev => ({
      ...prev,
      [selectedPhoto.id]: [...prev[selectedPhoto.id], comment]
    }));
    setNewComment('');
  };

  const filteredPhotos = activeCategory === 'all'
    ? photos
    : photos.filter(photo => photo.category === activeCategory);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Загрузка портфолио...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <header 
        className="header fade-in-up"
        style={headerStyle}
      >
        <div className="container">
          <h1 style={{ color: headerStyle.color }}>Анна Иванова</h1>
          <p style={{ color: headerStyle.color }}>Фотография, которая рассказывает историю</p>
        </div>
      </header>

      <section className="section fade-in-up">
        <div className="container">
          <div className="categories-container">
            {['all', 'architecture', 'nature', 'people', 'animals'].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
                style={activeCategory === cat ? { 
                  background: cat === 'all' ? 
                    'linear-gradient(135deg, #6b705c, #6b705ccc)' :
                    cat === 'architecture' ? 'linear-gradient(135deg, #9a8c98, #9a8c98cc)' :
                    cat === 'nature' ? 'linear-gradient(135deg, #4a7c59, #4a7c59cc)' :
                    cat === 'people' ? 'linear-gradient(135deg, #c44536, #c44536cc)' :
                    'linear-gradient(135deg, #3d5a80, #3d5a80cc)',
                  color: 'white'
                } : {}}
              >
                {cat === 'all' ? 'Все' : 
                 cat === 'architecture' ? 'Архитектура' :
                 cat === 'nature' ? 'Природа' :
                 cat === 'people' ? 'Люди' :
                 'Животные'}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section fade-in-up">
        <div className="container">
          <h2 className="section-title">
            {activeCategory === 'all' ? 'Моя работа' : 
             activeCategory === 'architecture' ? 'Архитектура' : 
             activeCategory === 'nature' ? 'Природа' : 
             activeCategory === 'people' ? 'Люди' : 'Животные'}
          </h2>
          <div className="gallery">
            {filteredPhotos.map((photo, index) => (
              <div 
                key={photo.id} 
                className="gallery-item" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="image-container">
                  <img src={photo.src.trim()} alt={photo.alt} />
                  <div className="overlay">
                    <button
                      onClick={() => openModal(photo)}
                      className="view-btn"
                    >
                      <span className="btn-icon">👁️</span>
                      <span className="btn-text">Просмотр</span>
                    </button>
                  </div>
                </div>
                <div className="like-container" onClick={() => handleLike(photo.id)}>
                  <span className="like-icon">
                    {likedPhotos.has(photo.id) ? '❤️' : '🤍'}
                  </span>
                  <span className="like-count">{likes[photo.id]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section fade-in-up">
        <div className="container">
          <h2 className="section-title">Связаться со мной</h2>
          <form
            action="https://formspree.io/f/mvgbvnvr"
            method="POST"
            className="contact-form"
          >
            <input type="hidden" name="_subject" value="📩 Новое сообщение с портфолио фотографа" />
            <div className="form-group">
              <label htmlFor="name">Имя</label>
              <input type="text" id="name" name="name" placeholder="Ваше имя" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Ваш email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Сообщение</label>
              <textarea id="message" name="message" placeholder="Чем могу помочь?" required></textarea>
            </div>
            <button type="submit" className="submit-btn">Отправить</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Анна Иванова. Все права защищены.</p>
        </div>
      </footer>

      {isModalOpen && selectedPhoto && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
            
            <h3 className="modal-title">{selectedPhoto.alt}</h3>
            
            <div className="modal-image">
              <img src={selectedPhoto.src.trim()} alt={selectedPhoto.alt} />
            </div>
            
            <div className="comments-section">
              <h4>Комментарии ({comments[selectedPhoto.id]?.length || 0})</h4>
              <div className="comments-list">
                {comments[selectedPhoto.id]?.map(comment => (
                  <div key={comment.id} className="comment-item">
                    <div className="comment-header">
                      <strong>{comment.author}</strong>
                      <span className="comment-date">• {comment.date}</span>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="add-comment">
              <label>Написать комментарий:</label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Введите ваш комментарий..."
                rows="3"
                className="comment-input"
              />
              <button onClick={addComment} className="comment-submit-btn">
                Отправить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;