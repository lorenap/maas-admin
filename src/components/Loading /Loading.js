import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  progress: {
    margin: 16,
    zIndex: 9999
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingContainerBackdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9998,
    background: 'rgba(255, 255, 255, 0.7)'
  }
}

class Loading extends React.Component {
  constructor(props) {
    super(props)
    this.requests = []
    this.mounted = false

    this.state = {
      showLoadingSpinner: false,
      mounted: false
    }
  }

  componentDidMount () {
    this.mounted = true
  }

  componentWillUnmount () {
    this.mounted = false
  }

  validaExibicao () {
    if (this.mounted) {
      this.setState({
        showLoadingSpinner: this.requests.length > 0
      })
    }
  }

  wait (ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  show () {
    this.requests.push(1)
    // Aguarda 500ms antes de exibir, para evitar o efeito de ficar piscando a tela
    this.wait(500)
    this.validaExibicao()
  }

  hide () {
    this.requests.pop()
    this.validaExibicao()
  }

  render () {
    return this.state.showLoadingSpinner ? (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingContainerBackdrop}></div>
        <CircularProgress style={styles.progress} />
      </div>
    ) : ''
  }
}

export default Loading;
