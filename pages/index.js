import { Box, Button, Text, TextField, Image, ThemeGenerator } from '@skynexui/components';
import { getParametrizedRoute } from 'next/dist/shared/lib/router/utils/route-regex';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import axios from 'axios';



function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['000']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
    </>
  );
}

export default function PaginaInicial() {
      const [username, setUsername] = React.useState ('Diydar');
      const [info, setinfo] = React.useState({})
      const roteamento = useRouter();

  const getInfo=(  )=>{
      axios.get(`https://api.github.com/users/${ username }`).then((response)=>{
          let data=response.data
          setinfo(data)
      }).catch((error)=>{
          console.log(error)
      })
  }

// codigo funcional de delay

useEffect(()=>{
  const timeout=setTimeout(() => {
    getInfo()
  }, 1000);
  return ()=>clearTimeout(timeout)
}, [username])

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[900],
          backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              console.log('Alguém submeteu o form');
              // roteamento.push('/chat?username=' + username);
              roteamento.push(`/chat?username=${username}`);
              // window.location.href = '/chat';
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            <TextField
              value={username}            
              onKeyUp={function (event) {           
                  setUsername(event.target.value)
           }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}  
            />

            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            {info != null && typeof info.avatar_url != undefined && <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={info.avatar_url}
            />}

            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
            <div>
              {/* componentDidMount() {
                fetch("https://api.github.com/users/${username}")
                    .then((res) => res.json())
                    .then((json) => {
                        this.setState({
                            items: json
                        });
                    })
            } */}
            </div>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}