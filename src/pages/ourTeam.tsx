import didas from '../assets/didas.png'
import lydia from '../assets/lydia.png'
import Morris from '../assets/Morris.jpeg';
import martial from '../assets/martial.jpeg'
import bahati from '../assets/bahati.jpeg'
import derrick from '../assets/derrick.png'
import robert from '../assets/robert.jpeg'
import pacifique from '../assets/pacifique.png'
import React from 'react';
import rodrigue from '../assets/rodrigue.jpeg'

import { FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';

interface TeamMemberProps {
  name: string;
  role: string;
  imageUrl: string;
  description: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, imageUrl, description }) => (
  <div className="flex flex-col items-center top-2 bg-white ">
    <img src={imageUrl} alt={name} className="w-32 h-32 rounded-full mb-4" />
    <h3 className="text-xl font-semibold">{name}</h3>
    <p className="text-gray-600 mb-2">{role}</p>
    <p className="text-sm text-gray-500 text-center mb-4 font-catamaran font-thin">
      {description}
    </p>
    <div className="flex space-x-2">
      <a href="#" className="text-gray-400 hover:text-gray-600">
        <FaTwitter />
      </a>
      <a href="#" className="text-gray-400 hover:text-gray-600">
        <FaLinkedin />
      </a>
      <a href="#" className="text-gray-400 hover:text-gray-600">
        <FaFacebook />
      </a>
    </div>
  </div>
);

// TeamGrid
const teamMembers = [
    { 
      name: "Didas Mbalanya", 
      role: "CEO", 
      imageUrl: didas, 
      description: "Didas is the visionary leader driving our company's success.he has a keen eye for innovation and strategic growth. His leadership style fosters a culture of excellence and teamwork." 
    },
    { 
      name: "Lydia Ingabire", 
      role: "Team Leader", 
      imageUrl: lydia, 
      description: "Lydia leads our team with a focus on innovation and collaboration.Lydia's commitment to continuous improvement ensures our projects are top-notch." 
    },
    { 
      name: "Kwizera Balinda Maurice", 
      role: "Developer", 
      imageUrl: Morris, 
      description: "Maurice is known for his attention to detail and coding prowess. He excels in both front-end and back-end development." 


    },
    { 
      name: "Martial Kirenga", 
      role: "Developer", 
      imageUrl: martial, 
      description: "Martial brings expertise in back-end development to our projects. He ensures that our systems are robust, secure, and scalable." 


    },
    { 
      name: "Yves Bahati", 
      role: "Developer", 
      imageUrl: bahati, 
      description: "Yves is a skilled developer with a passion for problem-solving. He specializes in creating efficient, scalable solutions that meet our clients' needs." 

    },
    { 
      name: "Derrick Iradukunda", 
      role: "Developer", 
      imageUrl: derrick, 
      description: "Derrick specializes in backend-end development and user experience.  Derrick is always on the lookout for the latest trends to keep our projects cutting-edge."

    },
    { 
        name: "Robert Rwibutso", 
        role: "Developer", 
        imageUrl: robert, 
        description: "Robert's innovative solutions drive our technical excellence. He is proficient in multiple programming languages and frameworks. " 
      },
    { 
      name: "Pacifique Ishimwe", 
      role: "Developer", 
      imageUrl: pacifique, 
      description: "pacifique's innovative solutions drive our technical excellence. He is proficient in multiple programming languages and frameworks. " 

    },

  
    {
        name: "Rodrigue Ndahayo", 
        role: "Developer", 
        imageUrl: rodrigue, 
      description: "Rodrigue specializes in backend-end development and user experience.  Rodrigue is always on the lookout for the latest trends to keep our projects cutting-edge."

      },
    ]
  
  
  const TeamGrid: React.FC = () => (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="container mx-auto px-4 py-16 my-12">
        <h2 className="text-3xl font-bold text-center mb-2 font-catamaran font-thin">MEET OUR TEAM OF EXPERTS</h2>
        <p className="text-center text-gray-600 mb-12 font-catamaran font-thin">
 We believe in the power of collaboration and are committed to exceeding our clients' expectations. Meet the individuals who make it all possible.
</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {teamMembers.map((member) => (
            <TeamMember key={member.name} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
  
const AndelaTeam: React.FC = () => (
  <div className="bg-gray-100 min-h-screen flex flex-col">
    <nav className="bg-white shadow-md p-4">
      {/* Navigation content */}
    </nav>
    <main className="flex-grow">
      <TeamGrid />
    </main>
  </div>
);

export default AndelaTeam;

import didas from '../assets/didas.png'
import lydia from '../assets/lydia.png'
import Morris from '../assets/Morris.jpeg';
import martial from '../assets/martial.jpeg'
import bahati from '../assets/bahati.jpeg'
import derrick from '../assets/derrick.png'
import robert from '../assets/robert.jpeg'
import pacifique from '../assets/pacifique.png'
import rodrigue from '../assets/rodrigue.jpeg'

import { FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';

interface TeamMemberProps {
  name: string;
  role: string;
  imageUrl: string;
  description: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, imageUrl, description }) => (
  <div className="flex flex-col items-center top-2 bg-white ">
    <img src={imageUrl} alt={name} className="w-32 h-32 rounded-full mb-4" />
    <h3 className="text-xl font-semibold">{name}</h3>
    <p className="text-gray-600 mb-2">{role}</p>
    <p className="text-sm text-gray-500 text-center mb-4 font-catamaran font-thin">
      {description}
    </p>
    <div className="flex space-x-2">
      <a href="#" className="text-gray-400 hover:text-gray-600">
        <FaTwitter />
      </a>
      <a href="#" className="text-gray-400 hover:text-gray-600">
        <FaLinkedin />
      </a>
      <a href="#" className="text-gray-400 hover:text-gray-600">
        <FaFacebook />
      </a>
    </div>
  </div>
);

// TeamGrid
const teamMembers = [
    { 
      name: "Didas Mbalanya", 
      role: "CEO", 
      imageUrl: didas, 
      description: "Didas is the visionary leader driving our company's success.he has a keen eye for innovation and strategic growth. His leadership style fosters a culture of excellence and teamwork." 
    },
    { 
      name: "Lydia Ingabire", 
      role: "Team Leader", 
      imageUrl: lydia, 
      description: "Lydia leads our team with a focus on innovation and collaboration.Lydia's commitment to continuous improvement ensures our projects are top-notch." 
    },
    { 
      name: "Kwizera Balinda Maurice", 
      role: "Developer", 
      imageUrl: Morris, 
      description: "Maurice is known for his attention to detail and coding prowess. He excels in both front-end and back-end development." 


    },
    { 
      name: "Martial Kirenga", 
      role: "Developer", 
      imageUrl: martial, 
      description: "Martial brings expertise in back-end development to our projects. He ensures that our systems are robust, secure, and scalable." 


    },
    { 
      name: "Yves Bahati", 
      role: "Developer", 
      imageUrl: bahati, 
      description: "Yves is a skilled developer with a passion for problem-solving. He specializes in creating efficient, scalable solutions that meet our clients' needs." 

    },
    { 
      name: "Derrick Iradukunda", 
      role: "Developer", 
      imageUrl: derrick, 
      description: "Derrick specializes in backend-end development and user experience.  Derrick is always on the lookout for the latest trends to keep our projects cutting-edge."

    },
    { 
        name: "Robert Rwibutso", 
        role: "Developer", 
        imageUrl: robert, 
        description: "Robert's innovative solutions drive our technical excellence. He is proficient in multiple programming languages and frameworks. " 
      },
    { 
      name: "Pacifique Ishimwe", 
      role: "Project Manager", 
      imageUrl: pacifique, 
      description: "pacifique's innovative solutions drive our technical excellence. He is proficient in multiple programming languages and frameworks. " 

    },

  
    {
        name: "Rodrigue Ndahayo", 
        role: "Developer", 
        imageUrl: rodrigue, 
      description: "Rodrigue specializes in backend-end development and user experience.  Rodrigue is always on the lookout for the latest trends to keep our projects cutting-edge."

      },
    ]
  
  
  const TeamGrid: React.FC = () => (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="container mx-auto px-4 py-16 my-12">
        <h2 className="text-3xl font-bold text-center mb-2 font-catamaran font-thin">MEET OUR TEAM OF EXPERTS</h2>
        <p className="text-center text-gray-600 mb-12 font-catamaran font-thin">
 We believe in the power of collaboration and are committed to exceeding our clients' expectations. Meet the individuals who make it all possible.
</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {teamMembers.map((member) => (
            <TeamMember key={member.name} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
  
const AndelaTeam: React.FC = () => (
  <div className="bg-gray-100 min-h-screen flex flex-col">
    <nav className="bg-white shadow-md p-4">
      {/* Navigation content */}
    </nav>
    <main className="flex-grow">
      <TeamGrid />
    </main>
  </div>
);

export default AndelaTeam;
