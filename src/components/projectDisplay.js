import React from 'react'
import PropTypes from 'prop-types'

class ProjectDisplay extends React.Component {
  constructor() {
    super()
  }

  render() {
    let styles = {
      container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'space-between',
        display: 'flex',
      },
      imgContainer: {
        flex: 1,
        minHeight: '500px',
        minWidth: '500px',
      },
      details: {
        display: 'flex',
        flexDirection: 'column',
        height: '500px',
        width: '500px',
        padding: '30px',
        color: 'darkgray',
        justifyContent: 'space-evenly'
      },
      title: {
        fontSize: '1.5rem',
        alignText: 'center',
      },
      description: {
        fontSize: '1rem',
      }
    }
    if (this.props.image) {
      styles.imgContainer.background = `url(${this.props.image})`
      styles.imgContainer.backgroundSize = 'cover'
      styles.imgContainer.backgroundRepeat = 'no-repeat'
      styles.imgContainer.backgroundPosition = 'center'
    }
    if (this.props.size === 'tall') {
      styles.imgContainer.height = '600px'
      styles.details.height = '600px'
    }

    return (this.props.index % 2 == 0) ? (
      <div style={styles.container}>
        <div style={styles.imgContainer} />
        <div style={styles.details}>
          <h5 style={styles.title}>{this.props.description}</h5>
          <p style={styles.description}>{this.props.details}</p>
        </div>
      </div>
    ) : (
      <div style={styles.container}>
        <div style={styles.details}>
          <h5 style={styles.title}>{this.props.description}</h5>
          <p style={styles.description}>{this.props.details}</p>
        </div>
        <div style={styles.imgContainer} />
      </div>
    )
  }

}

ProjectDisplay.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  size: PropTypes.string,
  index: PropTypes.number,
  details: PropTypes.string
}

export default ProjectDisplay