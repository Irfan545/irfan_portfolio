import { IconType } from "react-icons";

export interface Skill {
  id: string;
  icon: IconType;
  title: string;
  backgroundColor: string;
  iconColor: string;
  description?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
}

export interface HeroSectionProps {
  heading: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export interface SkillCardProps {
  skill: Skill;
}

export interface LoadingState {
  isLoading: boolean;
  progress: number;
}

export interface AnimationProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
}

export interface ParticleConfig {
  particles: {
    number: {
      value: number;
      density: {
        enable: boolean;
        value_area: number;
      };
    };
    color: {
      value: string;
    };
    shape: {
      type: string;
    };
    opacity: {
      value: number;
      random: boolean;
    };
    size: {
      value: number;
      random: boolean;
    };
    line_linked: {
      enable: boolean;
      distance: number;
      color: string;
      opacity: number;
      width: number;
    };
    move: {
      enable: boolean;
      speed: number;
      direction: string;
      random: boolean;
      straight: boolean;
      out_mode: string;
      bounce: boolean;
    };
  };
  interactivity: {
    detect_on: string;
    events: {
      onhover: {
        enable: boolean;
        mode: string;
      };
      onclick: {
        enable: boolean;
        mode: string;
      };
      resize: boolean;
    };
  };
  retina_detect: boolean;
} 