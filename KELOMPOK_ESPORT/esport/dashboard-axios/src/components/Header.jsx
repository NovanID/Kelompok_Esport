import '../pages/style/Header.css';

import sponsor1  from '../assets/sponsor1.jpg';
import sponsor2  from '../assets/sponsor2.png';
import sponsor3  from '../assets/sponsor3.png';
import sponsor4  from '../assets/sponsor4.avif';
import sponsor5  from '../assets/sponsor5.png';
import sponsor6  from '../assets/sponsor6.png';
import sponsor7  from '../assets/sponsor7.png';
import sponsor8  from '../assets/sponsor8.png';
import sponsor9  from '../assets/sponsor9.png';
import sponsor10 from '../assets/sponsor10.png';

const sponsors = [
  { pos: 1,  src: sponsor1  },
  { pos: 2,  src: sponsor2  },
  { pos: 3,  src: sponsor3, isBig: true },
  { pos: 4,  src: sponsor4  },
  { pos: 5,  src: sponsor5  },
  { pos: 6,  src: sponsor6  },
  { pos: 7,  src: sponsor7  },
  { pos: 8,  src: sponsor8  },
  { pos: 9,  src: sponsor9  },
  { pos: 10, src: sponsor10 },
];

const Header = () => {
  return (
    <header>
      <div
        className="slider"
        style={{
          "--width": "100px",
          "--height": "60px",
          "--quantity": "10",
        }}
      >
        <div className="list">
          {sponsors.map((item, index) => (
            <div
              key={index}
              className="item"
              style={{ "--position": item.pos }}
            >
              <img
                src={item.src}
                className={item.isBig ? "big" : ""}
                alt={`Sponsor ${item.pos}`}
              />
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;