import React from 'react';
import {
    AboutSection,
    ArticlesSection,
    ContactSection,
    HeroSection,
    InterestsSection,
    Page,
    ProjectsSection,
    Seo,
} from 'gatsby-theme-portfolio-minimal';

export default function IndexPage() {
    return (
        <>
            <Seo
                title="Vincent Casteldaccia - Full Stack TypeScript Developer | Angular & React Specialist"
                description="Full Stack TypeScript Developer specializing in Angular and React/Next.js. Based in Australia, available for remote opportunities worldwide. Expert in building scalable web applications."
            />
            <Page useSplashScreenAnimation>
                <HeroSection sectionId="hero" />
                <AboutSection sectionId="about" heading="About Me" />
                <ProjectsSection sectionId="projects" heading="Projects" />
                <InterestsSection sectionId="skills" heading="Skills & Technologies" />
                <ArticlesSection sectionId="articles" heading="Latest Articles" sources={['Blog']} />
                <ContactSection sectionId="contact" heading="Let's Work Together" />
            </Page>
        </>
    );
}
