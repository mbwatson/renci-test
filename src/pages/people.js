import React, { useEffect, useState } from "react"
import { SEO } from '../components/seo'
import { usePeople, useTeams } from '../hooks'
import { Container, Section, HorizontalRule } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import { StaffList } from '../components/people'

const PeoplePage = () => {
    const { staff, ood, management, chiefScientists } = usePeople()
    const teams = useTeams()

    return (
        <Container>
            <SEO title="RENCI Staff" />
            
            <Title>Our Team</Title>
            
            <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                A, necessitatibus debitis sunt laboriosam, id vel molestias vero
                asperiores officiis impedit delectus eveniet dolores itaque est velit eos repellendus,
                esse veniam soluta doloribus voluptatum reiciendis.
                Excepturi hic corporis labore molestiae assumenda vitae nemo quas deleniti dolore aspernatur,
                maxime ipsam maiores iusto laborum consectetur culpa dolorum neque veniam repudiandae fuga inventore enim!
                Ratione enim explicabo odio minima possimus, laborum, quo voluptates harum sit magnam quos veniam voluptatem modi.
                Laborum accusantium voluptatem atque sint asperiores molestias quaerat voluptates.
                Laudantium reiciendis omnis explicabo voluptas, exercitationem error accusantium magnam,
                dolorum possimus nihil perferendis necessitatibus corrupti!
            </Paragraph>

            <HorizontalRule />

            <Section title="Office of the Director" fullWidth>
                <StaffList staff={ ood } />
            </Section>

            <HorizontalRule />

            <Section title="Management Team" fullWidth>
                <StaffList staff={ management } />
            </Section>

            <HorizontalRule />

            <Section title="Chief Scientists" fullWidth>
                <StaffList staff={ chiefScientists } />
            </Section>

            <HorizontalRule />

            <Section title="All Staff" fullWidth>
                <StaffList staff={ staff } />
            </Section>

        </Container>
    )
}

export default PeoplePage
