import React, { useEffect ,useRef ,useState } from 'react'
import {motion} from "framer-motion"
import FloatingBubble from './FloatingBubble';
function SkillsComp() {

const skills = [
  // Core Languages
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },

  // Frontend & Styling
  { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "NextJs", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Redux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
  { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },

  // Backend & Database
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Postgres", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },

  // AI & Innovation
  { name: "GenAI", logo: "https://img.icons8.com/fluency/48/artificial-intelligence.png" }, 

  // Tools
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" }
];

const rows = [
  // First Row: Primary Tech Stack
  [
    { 
      title: "Programming Languages", 
      items: ["Python", "Java", "C++", "C", "JavaScript"] 
    },
    { 
      title: "Frontend Development", 
      items: ["Next.js", "React", "Redux Toolkit", "Tailwind CSS", "HTML5/CSS3"] 
    },
    { 
      title: "Backend & AI", 
      items: ["Node.js", "Express", "LangChain", "GenAI Integration", "n8n Automation"] 
    },
    { 
      title: "Databases", 
      items: ["PostgreSQL", "MongoDB", "MySQL", "Appwrite"] 
    },
  ],
  // Second Row: Foundations, Hardware & Soft Skills
  [
    { 
      title: "Tools & Frameworks", 
      items: ["Git", "GitHub", "Framer Motion", "Postman", "Vercel","Render"] 
    },
    {
      title: "Core Concepts",
      items: [
        "Data Structures & Algorithms",
        "Cybersecurity (CTF)",
        "Web Development",
        "Authentication (JWT/OAuth)",
        "Web Sockets"
      ],
    },
    {
      title: "Soft Skills",
      items: ["Problem Solving", "Team Leadership", "Public Speaking", "Creative Design"],
    },
  ],
];

const stageRef = useRef(null);
  const [bubbles, setBubbles] = useState([]);
  const requestRef = useRef();
  
  // Adjusted size for better physics flow
  const BUBBLE_RADIUS = 50; 

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();

    // Initial state: Random positions and velocities
    let initialBubbles = skills.map((skill) => ({
      ...skill,
      x: Math.random() * (rect.width - BUBBLE_RADIUS * 2) + BUBBLE_RADIUS,
      y: Math.random() * (rect.height - BUBBLE_RADIUS * 2) + BUBBLE_RADIUS,
      vx: (Math.random() - 0.5) * 2, // Velocity X
      vy: (Math.random() - 0.5) * 2, // Velocity Y
      radius: BUBBLE_RADIUS
    }));

    const animate = () => {
  initialBubbles = initialBubbles.map(b => {
    let nextX = b.x + b.vx;
    let nextY = b.y + b.vy;

    // 1. Strict Horizontal Boundaries (Left & Right)
    if (nextX - b.radius <= 0) {
      nextX = b.radius; // Force back inside
      b.vx = Math.abs(b.vx); // Move right
    } else if (nextX + b.radius >= rect.width) {
      nextX = rect.width - b.radius; // Force back inside
      b.vx = -Math.abs(b.vx); // Move left
    }

    // 2. Strict Vertical Boundaries (Top & Bottom Baseline)
    if (nextY - b.radius <= 0) {
      nextY = b.radius; // Force back inside
      b.vy = Math.abs(b.vy); // Move down
    } else if (nextY + b.radius >= rect.height) {
      nextY = rect.height - b.radius; // Force back to the "Baseline"
      b.vy = -Math.abs(b.vy); // Move up
    }

    return { ...b, x: nextX, y: nextY };
  });

      // 2. Bubble-to-Bubble Collisions
      for (let i = 0; i < initialBubbles.length; i++) {
        for (let j = i + 1; j < initialBubbles.length; j++) {
          const b1 = initialBubbles[i];
          const b2 = initialBubbles[j];

          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDistance = b1.radius + b2.radius;

          if (distance < minDistance) {
            // Elastic collision logic: Swap velocities or reflect
            const angle = Math.atan2(dy, dx);
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);

            // Resolve overlap (prevent bubbles from getting stuck)
            const overlap = minDistance - distance;
            initialBubbles[i].x -= overlap * cos * 0.5;
            initialBubbles[i].y -= overlap * sin * 0.5;
            initialBubbles[j].x += overlap * cos * 0.5;
            initialBubbles[j].y += overlap * sin * 0.5;

            // Simple velocity reflection
            const tempVx = b1.vx;
            const tempVy = b1.vy;
            initialBubbles[i].vx = b2.vx;
            initialBubbles[i].vy = b2.vy;
            initialBubbles[j].vx = tempVx;
            initialBubbles[j].vy = tempVy;
          }
        }
      }

      setBubbles([...initialBubbles]);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
//ref={stageRef}: This connects this specific HTML div to your useEffect logic
  return (
    <section className=' h-full mx-13 justify-center  my-2 bg-black flex flex-col  '>
        <motion.div 
        className='pl-2'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl text-cyan-400 font-semibold mb-3">My Skills</h2>
        <div className="w-28 h-[2px] bg-cyan-400 mb-2"></div>
        <p className="text-gray-400 text-lg mb-2 max-w-xl">
          Blending precision with imagination — interactive skills powered by physics.
        </p>
      </motion.div>

      <div
        ref={stageRef}
        className='relative w-full h-[580px] bg-gray-900/50 border border-white/10 rounded-2xl overflow-hidden'
      >
        {bubbles.map((b, i) => (
          <FloatingBubble
            key={i}
            // Passing center coordinates; ensure FloatingBubble uses 
            // transform: translate(-50%, -50%) for perfect centering
            x={b.x} 
            y={b.y}
            logo={b.logo}
            name={b.name}
          />
        ))}
      </div>




<motion.div
whileInView={{opacity:1,scale:1}}
transition={{ duration: 1.5 }}
className="w-full py-10"
initial={{ opacity: 0, scale:0.9,y:50 }}
>
    
    {rows.map((row, rowIndex) => (
    <div 
    key={rowIndex} 
    className="flex justify-center gap-15  mb-15 flex-wrap"
    >
    {row.map((col, colIndex) => (
        <motion.div
          key={colIndex}
          className="bg-[#0b1220] border border-cyan-400/20 
                     rounded-2xl p-8 w-70 h-70 shadow-lg hover:shadow-cyan-400/20
                     transition-all duration-300"
          whileHover={{ scale: 1.03 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3 border-b border-cyan-400/20 pb-2">
            {col.title}
          </h3>

          <ul className="space-y-2">
            {col.items.map((item, i) => (
              <motion.li
                key={i}
                className="text-gray-300 text-md cursor-pointer"
                whileHover={{ x: 6, color: "#00ffc8" }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  ))}
</motion.div>

    </section>
    //.map(...): This loops through your positions array (the one you filled with {x, y} coordinates).
    //pos: The current coordinate object (e.g., {x: 50, y: 120}).
    //i: The index (0, 1, 2...). This is vital because you use it to look up the matching skill info in the skills array.
  )
}

export default SkillsComp


/*this comp js only check the overlaping and postion the bubble

1. use if useref
useRef in React is a hook that lets you create a mutable reference to something that and persists across renders
does NOT re-render the component when changed
can store DOM elements or any JavaScript value

///////iMportant///////
stageRef becomes a reference to the actual DOM element of that <div>.
So after the component renders, you can do:
stageRef.current
And that gives you the real <div> element in the page.


2.  stageRef will attach to the container <div> so we can read its size/position.
    positions is an array of { x, y } objects (pixel coordinates) used to position each bubble.

3.   In your code, the stageRef (referred to as stage) does NOT know anything about the bubbles themselves. It only refers to the container <div> that holds all the bubbles.
    useEffect runs once (empty dependency array []), and its job is to compute newPositions

4.getBoundingClientRect() returns the container’s width/height in pixels (and x/y relative to viewport). The code uses rect.width and rect.height to know the available space.
const placed = [];placed is an array that keeps track of all bubbles that have already been assigned a position.

5. isoverlap function check
This tests if a candidate (x, y) overlaps any already placed bubble.
It computes Euclidean distance between (p.x, p.y) and (x, y) and compares it to the sum of radii plus an extra 40 pixel buffer.

6.Position generation loop:-
chooses size = 110 (matches w-28 h-28 in FloatingBubble — 112px nominal, close enough).
randomly picks x and y so the bubble stays within rect.width/rect.height with a 20px margin.
repeats until it finds a non-overlapping spot or tries reaches 120 (failsafe).
stores { x, y, size } in placed and returns { x, y } for setPositions.


7. **************imp***************** 
We loop over skills to calculate newPositions because skills is the "Source of Truth" for how many items exist.
We aren't using the skill names (like "React" or "Git") inside the math calculation, but we are using the length of the array to dictate how many coordinate
 pairs we need to generate.
*/