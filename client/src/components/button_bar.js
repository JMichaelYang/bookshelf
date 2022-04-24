import { Button, Stack } from '@mui/material';

const ButtonBar = (props) => {
  const { leftButtons, rightButtons } = props;

  return (
    <Stack direction='row' justifyContent={'space-between'} spacing={2}>
      <Stack direction='row' justifyContent={'space-between'} spacing={2}>
        {leftButtons.map((button, i) => (
          <Button key={`left-button-${i}`} color={button.color} variant='outlined' onClick={button.action}>
            {button.text}
          </Button>
        ))}
      </Stack>
      <Stack direction='row' justifyContent={'space-between'} spacing={2}>
        {rightButtons.map((button, i) => (
          <Button key={`right-button-${i}`} color={button.color} variant='outlined' onClick={button.action}>
            {button.text}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};

export default ButtonBar;
