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
            <Seo title="Full Stack TypeScript Developer - Remote Developer Australia" />
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
