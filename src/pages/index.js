import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { Animation, Input, Button, Message } from 'rsuite'
const { Fade, Collapse } = Animation

import 'rsuite/dist/styles/rsuite.min.css'
import Layout from "../components/layout"
import SEO from "../components/seo"
import ProjectDisplay from '../components/projectDisplay.js'

import More from "../images/more.inline.svg"

// Home Page
class IndexPage extends React.Component {
  constructor() {
    super()
    this.state = {
      workHeight: 0,
      showWork: false,
      peopleHeight: 0,
      showPeople: false,
      contactHeight: 0,
      showContact: false,
      userName: '',
      userEmail: '',
      userMessage: '',
      messageSubject: '',
      messageError: false,
      focus: false
    }
  }

  componentDidMount() {
    const workHeight = this.workElement.clientHeight
    const peopleHeight = this.peopleElement.clientHeight
    const contactHeight = this.contactElement.clientHeight
    this.setState({ workHeight, peopleHeight, contactHeight })
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener("resize", this.updateDimensions)
  }
  componentDidUpdate() {
    if (this.state.messageError) {
      window.setTimeout(() => this.setState({ messageError: false }), 3000)
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener("resize", this.updateDimensions)
  }

  toggleHover = (e) => {
    let focusedPerson = e.nativeEvent.relatedTarget;
    if (focusedPerson) this.setState({focus: focusedPerson.id})
  }

  resetHover = () => {
    this.setState({focus: false})
  }

  render() {
    const pageData = this.props.data.cosmicjsPages.metadata
    const siteData = this.props.data.cosmicjsSettings.metadata
    const contactData = this.props.data.cosmicjsContacts.metadata
    const peopleData = this.props.data.allCosmicjsPeople.edges
    const projectData = this.props.data.allCosmicjsProjects.edges
    let headerBreakpoint
    if (typeof window !== 'undefined') {
      headerBreakpoint = window.innerHeight - 125
    }
    const styles = {
      splash: {
        background: `#000000`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      splashPhrase: {
        color: '#ffffff',
        textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000',
        opacity: 1,
        paddingLeft: 180
      },
      work: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 70,
        margin: '0 auto'
      },
      header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        flex: 1,
        textAlign: 'center'
      },
      description: {
        fontSize: '1.1rem',
        marginLeft: '10%',
        marginRight: '10%',
        textAlign: 'center',
      },
      contactForm: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      service: {
        height: '250px',
        width: '200px',
        margin: '50px',
        paddingTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        overflowX: 'auto',
        color: 'black',
      },
      serviceName: {
        fontSize: '1.2rem',
      },
      serviceDescription: {
        fontSize: '0.9rem',
        color: '#a9a9a9',
      },
      person: {
        marginTop: '20px',
        padding: '25px',
        display: 'flex',
        height: '600px',
        width: '33%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
      },
      personName: {
        marginTop: '0',
        color: 'black',
        fontSize: '1rem',
        textAlign: 'center',
      },
      personTitle: {
        color: 'grey',
        fontSize: '0.8rem',
        textAlign: 'center'
      },
      people: {
        margin: '0 auto'
      }
    }
    if (pageData.splash_image) {
      styles.splash.background = `url(${pageData.splash_image.url})`
      styles.splash.backgroundSize = `cover`
      styles.splash.backgroundRepeat = 'no-repeat'
      styles.splash.backgroundPosition = 'center'
    }
    return (
      <Layout
        siteTitle={siteData.site_title}
        siteLogo={siteData.site_logo}
        contact={contactData}
        headerBreakpoint={headerBreakpoint}
      >
        <SEO title="Home" keywords={[`cosmic js`, `application`, `react`]} />
        <section style={styles.splash} className="section-container splash">
          <div style={{opacity: 1}}>
          {pageData.splash_phrase
            ? <div className="splash-phrase" style={styles.splashPhrase}>
                <h2 style={{ fontSize: '2.5rem' }}>{pageData.splash_phrase}</h2>
              </div>
            : null
          }
          </div>
        </section>

        <section
          id="work"
          ref={el => { this.workElement = el }}
          style={styles.work}
          className="section-container content work"
        >
          <Fade in={this.state.showWork}>
            <div className="section-wrapper">
              <div className="section-header box" style={styles.header}>
                <div className={'boxContent'} style={{margin: 2}}>
                  <h2 className="section-title" style={styles.title}>{pageData.service_title}</h2>
                  <p className="people-description" style={styles.description}>{pageData.service_description}</p>
                </div>
              </div>
              <div 
                style={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column', paddingTop: 80
                }}
                className="wrapper-content projects"
              >
                {projectData.map((project, i) => (
                  <ProjectDisplay
                    index={i}
                    key={project.node.title}
                    title={project.node.title}
                    description={project.node.metadata.summary}
                    details={project.node.metadata.description}
                    image={project.node.metadata.image.url}
                  />
                ))}
              </div>
            </div>
          </Fade>
        </section>

        <section
          id="about"
          ref={el => { this.peopleElement = el }}
          className="section-container content people"
          style={styles.people}
        >
          <Fade in={this.state.showPeople}>
            <div className="section-wrapper">
              <div style={styles.header}>
                <h2 className="section-title" style={styles.title}>Who We Are</h2>
                <p style={styles.description}>{pageData.people_description}</p>
              </div>
              <div style={{flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'space-between', marginBottom: 35}}>
                <div className="wrapper-content" style={{flex: 1}}>
                  {peopleData.map(person => {
                    return (
                      <div
                        onMouseEnter={this.toggleHover}
                        onMouseLeave={this.resetHover}
                        key={person.node.title} 
                        style={styles.person}
                        id={person.node.title}
                      >
                        <div
                          style={{
                            background: `url(${person.node.metadata.image.url})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            marginTop: '28px',
                            marginBottom: '28px',
                            marginLeft: 'auto', marginRight: 'auto',
                            height: '400px',
                            width: '350px',
                          }}
                        />
                        <h5 style={styles.personName}>{person.node.title}</h5>
                        <h6 style={styles.personTitle}>{person.node.metadata.job_title}</h6>
                        <div style={{marginTop: '30px'}}>
                          <div style={{position: 'relative', display: 'flex', height: '0', width: '400px', justifyContent: 'center', alignItems: 'center'}}>
                            <More className={!(this.state.focus == person.node.title) ? 'toggleIn' : 'toggleOut'} style={{height: 30, width: 30, margin: '0 auto'}} />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              {peopleData.map(activePerson => {
                if (this.state.focus == activePerson.node.title) return (
                  <div 
                    key={activePerson.node.title}
                    className={'toggleIn hoverBorder'} 
                    style={{flex: 1, marginLeft: '10%', marginRight: '10%'}}
                  >
                    <div style={{padding: '25px'}}>
                      <p>{activePerson.node.metadata.desc1}</p>
                      <p>{activePerson.node.metadata.desc2}</p>
                      <p>{activePerson.node.metadata.desc3}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Fade>
        </section>

        <section
          id="contact"
          ref={el => { this.contactElement = el }}
          name="contact"
          className="section-container content bottom contact"
        >
          <Fade in={this.state.showContact}>
            <div className="contact-container">
              <div className="imageFilter" />
              <div style={styles.header, {flexDirection: 'column'}}>
                <h2 className="section-title" style={styles.title}>Contact Us</h2>
                <p style={styles.description}>Fill out the form below if you would like to get a hold of us.</p>
              </div>
              <form style={styles.contactForm} onSubmit={this.handleContactForm}>
                <Collapse in={this.state.messageError}>
                  <Message type="error" title="Error" description="Please Provide a valid input to all fields" />
                </Collapse>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                  <Input name="userName" value={this.state.userName} onChange={this.handleInput} placeholder="Name" />
                  <Input name="userEmail" value={this.state.userEmail} onChange={this.handleInput} placeholder="Email" />
                </div>
                <Input name="messageSubject" value={this.state.messageSubject} onChange={this.handleInput} placeholder="Subject" />
                <Input
                  componentClass="textarea"
                  name="userMessage"
                  value={this.state.userMessage}
                  onChange={this.handleInput}
                  rows={5}
                  placeholder="Message..."
                />
                <Button type="submit" appearance="ghost">
                  Send Mail
                </Button>
              </form>
            </div>
          </Fade>
        </section>
      </Layout>
    )
  }

  updateDimensions = () => {
    this.setState({
      workHeight: this.workElement.clientHeight,
      peopleHeight: this.peopleElement.clientHeight,
      contactHeight: this.contactElement.clientHeight,
    })
  }

  handleScroll = () => {
    if (window.scrollY >= (window.innerHeight / 3) + 100) {
      this.setState({ showWork: true })
    } else {
      this.setState({ showWork: false })
    }
    if (window.scrollY >= ((window.innerHeight + this.state.workHeight) - (window.innerHeight / 3))) {
      this.setState({ showPeople: true, showWork: false })
    } else {
      this.setState({ showPeople: false })
    }
    if (window.scrollY >= ((window.innerHeight + this.state.workHeight + this.state.peopleHeight) - (window.innerHeight / 3))) {
      this.setState({ showContact: true, showPeople: false })
    } else {
      this.setState({ showContact: false })
    }
  }

  handleContactForm = (e) => {
    e.preventDefault()
    if (!this.state.userName || !this.state.userEmail || !this.state.messageSubject || !this.state.userMessage) {
      this.setState({ messageError: true })
    } else {
      window.location.href = `
        mailto:${this.props.data.cosmicjsPages.metadata.contact_email}
        ?subject=${this.state.messageSubject}
        &body=Name :: ${this.state.userName}%0D%0AEmail :: ${this.state.userEmail}%0D%0ASent From :: ${window.location.href},%0D%0A%0D%0A${this.state.userMessage}`
    }
  }

  handleInput = (value, e) => {
    const { name } = e.target
    this.setState({ [name]: value })
  }
}

IndexPage.propTypes = {
  data: PropTypes.object,
}

export const query = graphql`
query Index {
  cosmicjsPages(slug: { eq: "home" }) {
    metadata {
      splash_image {
        url
      }
      splash_phrase
      contact_email
      service_title
      service_description
      people_description
    }
  }
  allCosmicjsPeople {
    edges {
      node {
        title
        metadata {
          image {
            url
          }
          job_title
          desc1
          desc2
          desc3
        }
      }
    }
  }
  allCosmicjsProjects {
    edges {
      node {
        title
        metadata {
          image {
            url
          }
          summary
          description
        }
      }
    }
  }
  cosmicjsContacts(slug: {eq: "company-footer"}) {
    metadata {
      address1
      postal_code
      city
      email
      phone_number
    }
  }
  cosmicjsSettings(slug: { eq: "site-data" }) {
    metadata {
      site_title
      site_logo {
        url
      }
    }
  }
}
`


export default IndexPage
