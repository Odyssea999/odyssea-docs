// src/components/Team.js
import React from 'react';
import styles from './team.module.css';

const teamMembers = [
  {
    name: 'Florvil Elim',
    role: 'Développeur full-stack',
    email: 'elim.florvil@edu.esiee-it.fr',
    bio: 'Elim est un développeur full-stack expérimenté, spécialisé dans le développement web. Curieux et créatif, il aime explorer les technologies modernes pour concevoir des applications dynamiques et robustes.',
    imgSrc: '/img/team/elim.jpeg',
  },
  {
    name: 'NSINGI Moïse',
    role: 'Développeur full-stack',
    email: 'moise.nsingi@edu.esiee-it.fr',
    bio: 'Moïse est passionné par le développement mobile et toujours à la recherche de nouvelles façons d’améliorer l’expérience utilisateur. Sa maîtrise des technologies modernes fait de lui un atout précieux pour tout projet mobile.',
    imgSrc: '/img/team/dev.png',
  },
  // {
  //   name: 'MUZAFFAR Eddy',
  //   role: 'Développeur full-stack',
  //   email: 'eddy.muzaffar@edu.esiee-it.fr',
  //   bio: 'Eddy est un développeur full-stack avec une expertise en applications mobiles. Sa passion pour l’innovation le pousse à créer des solutions intuitives, centrées sur les utilisateurs et optimisées pour la performance.',
  //   imgSrc: '/img/team/dev.png',
  // },
  // {
  //   name: 'Adje Abed',
  //   role: 'Développeur full-stack',
  //   email: 'abed.adje@edu.esiee-it.fr',
  //   bio: 'Abed est un développeur polyvalent, adepte des dernières technologies en matière de développement mobile. Son approche analytique et son souci du détail lui permettent de créer des applications performantes et fiables.',
  //   imgSrc: '/img/team/abed.jpeg',
  // },
  {
    name: 'BALAKRISHNAN Jeremy',
    role: 'Développeur full-stack',
    email: 'jeremy.balakrishnan@edu.esiee-it.fr',
    bio: 'Jeremy est un développeur dévoué avec un intérêt marqué pour le développement mobile et les solutions digitales. Toujours à la pointe de la technologie, il s’engage à offrir des expériences utilisateur mémorables et des produits de haute qualité.',
    imgSrc: '/img/team/dev.png',
  },
];


const Team = () => {
  return (
    <div className={styles.teamContainer}>
      {teamMembers.map((member, index) => (
        <div key={index} className={styles.teamMember}>
          <img src={member.imgSrc} alt={member.name} className={styles.teamImage} />
          <div className={styles.teamInfo}>
            <h3>{member.name}</h3>
            <p><strong>Rôle:</strong> {member.role}</p>
            <p><strong>Email:</strong> <a href={`mailto:${member.email}`}>{member.email}</a></p>
            <p>{member.bio}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Team;
