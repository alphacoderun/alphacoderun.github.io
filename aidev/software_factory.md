
# Software Factory (Before LLM)

```mermaid

flowchart TD
    subgraph top
    ceo --> prodManger["'production Manager'"]
    prodManger --> engineer
    end
    engineer --> doStuff["
        stuff to do

    "]
    doStuff --- stufNotes[[jira, issue tracker...etc ]]
    doStuff --> build["'someone builds the thing'"]
    build --- autoTest[[Automated Testing]]
    build --- manualTest[[Manaul  Testing eg browser]]
    build --> pr["'Pull Request'"]
    pr --> |loop #1|build
    pr --- cicd[[ci/cd checks, unit testing, static scanning, security checks]]
    cicd --- humanTest[[human tests the change]]
    humanTest --- humanReview[[human reviews the changes]]
    pr --> prod
    prod --- deploy[[roll out / deployment]]
    prod --> users
    prod --> monitor["'Monitoring'"]
    users --> feedback["'complaints / feature requests'"]
    feedback --> top
    monitor --> incidents
    incidents --> top

```

# Software Factory (Before LLM - to improve)

```mermaid

flowchart TD
    subgraph top
    ceo --> prodManger["'production Manager'"]
    prodManger --> engineer
    end
    engineer --> doStuff["
        stuff to do

    "]
    doStuff --- stufNotes[[jira, issue tracker...etc ]]
    subgraph planning
        architect[[Architecture proposal]]
        sprint[[Sprint planning]]
    end
    doStuff --- planning
    planning --> top
    doStuff --> humanWorker
    subgraph humanWorker[Hours or Days]
        build["someone builds the thing"] --- autoTest[[Automated Testing]]
        build --- manualTest[[Manaul  Testing eg browser]]
    end

    humanWorker --> pr["'Pull Request'"]
    pr --> |loop #1|humanWorker
    pr --- cicd[[ci/cd checks, unit testing, static scanning, security checks]]
    cicd --- humanTestReview
    subgraph humanTestReview[reivew: hours or days]
        humanTest[[human tests the change]] --- humanReview[[human reviews the changes]]
    end
    humanTestReview --- planningBenefit[[upfront planning <br/> eg help reduce review from 6hr to 20mins]]
    pr --> prod
    prod --- deploy[[roll out / deployment]]
    prod --> users
    prod --> monitor["'Monitoring'"]
    users --> feedback["'complaints / feature requests'"]
    feedback --> top
    monitor --> incidents
    incidents --> top

```



# The Agentic Software Factory
Replace the person who built the software

```mermaid

flowchart TD
    subgraph top
    ceo --> prodManger["'production Manager'"]
    prodManger --> engineer
    end
    engineer --> doStuff["
        stuff to do
    "]
    doStuff --- stufNotes[[jira, issue tracker...etc ]]
    doStuff --> agent["Agent builds the thing <br/>Orchestration | harness | sandbox | model"]
    agent --- autoTest[[Automated Testing]]
    agent --- manualTest[[Manaul  Testing eg browser]]
    agent --> pr["'Pull Request'"]
    pr --> |loop #1|agent
    pr --- cicd[[ci/cd checks, unit testing, static scanning, security checks]]
    pr --- humanTest[[human tests the change]]
    humanTest --- humanReview[[human reviews the changes]]
    pr --> prod
    prod --- deploy[[roll out / deployment]]
    prod --> users
    prod --> monitor["'Monitoring'"]
    users --> feedback["'complaints / feature requests'"]
    feedback --> top
    monitor --> incidents
    incidents --> ceo

```

## Time Savingins

```mermaid

flowchart TD
    subgraph top
    ceo --> prodManger["'production Manager'"]
    prodManger --> engineer
    end
    engineer --> doStuff["
        stuff to do
    "]
    doStuff --- stufNotes[[jira, issue tracker...etc ]]
    doStuff --> agent["Agent builds the thing <br/>Orchestration | harness | sandbox | model"]
    agent --- autoTest[[Automated Testing]]
    agent --- manualTest[[Manaul  Testing eg browser]]
    agent --> pr["'Pull Request'"]
    pr --> |loop #1|agent
    pr --- cicd[[ci/cd checks, unit testing, static scanning, security checks]]
    pr --- humanTest[[human tests the change]]
    humanTest --- humanReview[[human reviews the changes]]
    pr --> prod
    prod --- deploy[[roll out / deployment]]
    prod --> users
    prod --> monitor["'Monitoring'"]
    users --> feedback["'complaints / feature requests'"]
    feedback --> top
    monitor --> incidents
    incidents --> ceo

```














mermaid

flowchart TD
    subgraph top
    ceo --> prodManger["'production Manager'"]
    prodManger --> engineer
    end
    engineer --> doStuff["
        stuff to do
    "]
    doStuff --- stufNotes[[jira, issue tracker...etc ]]
    doStuff --> agentTime 
    subgraph agentTime [ Now minutes or hours ]
        agent["Agent builds the thing <br/>Orchestration | harness | sandbox | model"]
    agent --- autoTest[[Automated Testing]]
    agent --- manualTest[[Manaul  Testing eg browser]]
    end
    agentTime --> pr["'Pull Request'"]
    pr --> |loop #1|build
    pr --- cicd[[ci/cd checks, unit testing, static scanning, security checks]]
    cicd --- humanTime
    subgraph humanTime [ STILL hours or days]
        humanTest[[human tests the change]]
        humanReview[[human reviews the changes]]
    end 
    pr --> prod
    prod --- deploy[[roll out / deployment]]
    prod --> users
    prod --> monitor["'Monitoring'"]
    users --> feedback["'complaints / feature requests'"]
    feedback --> top
    monitor --> incidents
    incidents --> ceo

