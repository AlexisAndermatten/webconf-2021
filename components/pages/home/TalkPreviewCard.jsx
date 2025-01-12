import { DateTime } from 'luxon';
import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TALK_TYPES } from '~/data/speakers';
import { SpeakerPhoto } from './SpeakerPhoto';

const Container = styled(motion.div)`
  position: relative;
  box-sizing: border-box;
  margin-right: -4rem;
  padding: 0.375rem 2rem 0.375rem 0;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${({ theme, variant }) => theme.colors[`landingSpeakerVariant${variant}MainColor`]};
  cursor: pointer;

  & + & {
    margin-top: 3rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: 57rem;
    margin-right: -8rem;
    padding: 1rem 4rem 1rem 0;
    border-radius: 1.25rem;

    & + & {
      margin-top: 6.25rem;
    }
  }
`;

const TalkInfo = styled.div`
  position: absolute;
  top: -1rem;
  left: 4.5rem;
  font-size: 0.562rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    top: -1.5rem;
    left: 13.5rem;
    font-size: 1.125rem;
  }
`;

const TalkType = styled(motion.span)``;
const TalkSchedule = styled.span`
  font-weight: 900;
`;

const PhotoWrapper = styled(SpeakerPhoto)`
  flex-shrink: 0;
  width: 5.25rem;
  height: 5.25rem;
  margin: -2rem 0 -2rem -2rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 13.875rem;
    height: 13.875rem;
    margin: -3rem 0 -3rem -3rem;
  }
`;

const Info = styled.div`
  margin-left: 0.75rem;
  display: flex;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-left: 2rem;
  }
`;

const SpeakerName = styled.div`
  text-transform: uppercase;
  font-size: 0.625rem;
  color: ${({ theme, variant }) => theme.colors[`landingSpeakerVariant${variant}TalkColor`]};
  opacity: 75%;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: 1.625rem;
  }
`;

const TalkName = styled(motion.div)`
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme, variant }) => theme.colors[`landingSpeakerVariant${variant}TalkColor`]};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: 2.5rem;
  }
`;

const talkTypeToTitle = {
  [TALK_TYPES.STANDARD]: 'CHARLA',
  [TALK_TYPES.LIGHTNING]: (
    <>
      CHARLA <span style={{ color: 'gold' }}>RELÁMPAGO</span>
    </>
  ),
  [TALK_TYPES.KEYNOTE]: <span style={{ color: 'gold' }}>KEYNOTE</span>,
  [TALK_TYPES.WORKSHOP]: 'TALLER',
};

export const TalkPreviewCard = ({
  id,
  variant,
  photo,
  firstName,
  lastName,
  talkType,
  talkName,
  talkSchedule,
  onSelect,
  cospeaker,
  provider,
}) => {
  const talkStartDateTime = useMemo(
    () => DateTime.fromISO(talkSchedule[0], { locale: 'es-AR' }),
    [talkSchedule],
  );
  const talkEndDateTime = useMemo(
    () => DateTime.fromISO(talkSchedule[1], { locale: 'es-AR' }),
    [talkSchedule],
  );

  const [talkInfoStyle, setTalkInfoStyle] = useState({});
  useEffect(() => {
    const isMobile = global.innerWidth < 1024;
    if (isMobile) {
      setTalkInfoStyle({});
    } else {
      setTalkInfoStyle({ marginLeft: '11.3rem' });
    }
  }, []);

  return (
    <Container variant={variant} onClick={onSelect} layoutId={`speaker-${id}`}>
      <TalkInfo style={cospeaker ? talkInfoStyle : {}}>
        <TalkType>{talkTypeToTitle[talkType]}</TalkType>
        {' | '}
        <TalkSchedule>
          {talkStartDateTime.toLocaleString(DateTime.TIME_24_SIMPLE)}
          {' - '}
          {talkEndDateTime.toLocaleString(DateTime.TIME_24_SIMPLE)} HS.
        </TalkSchedule>
      </TalkInfo>
      <PhotoWrapper
        photo={photo}
        layoutId={`speaker-photo-${id}`}
        inset={talkType === TALK_TYPES.WORKSHOP}
        insetWidth="75%"
      />
      {cospeaker ? (
        <PhotoWrapper photo={cospeaker.photo} layoutId={`speaker-photo-${cospeaker.id}`} />
      ) : (
        ''
      )}
      <Info>
        <SpeakerName variant={variant}>
          <motion.span layoutId={`speaker-first-name-${id}`}>
            {talkType !== TALK_TYPES.WORKSHOP ? firstName : provider}
          </motion.span>{' '}
          {talkType !== TALK_TYPES.WORKSHOP ? (
            <motion.span layoutId={`speaker-last-name-${id}`}>{lastName}</motion.span>
          ) : (
            ''
          )}
          {cospeaker ? (
            <>
              {' y '}
              <motion.span layoutId={`cospeaker-first-name-${id}`}>
                {cospeaker.firstName}
              </motion.span>{' '}
              <motion.span layoutId={`cospeaker-last-name-${id}`}>{cospeaker.lastName}</motion.span>
            </>
          ) : (
            ''
          )}
        </SpeakerName>
        <TalkName variant={variant} layoutId={`speaker-talk-name-${id}`}>
          {talkName}
        </TalkName>
      </Info>
    </Container>
  );
};

TalkPreviewCard.propTypes = {
  id: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['A', 'B', 'C']).isRequired,
  photo: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  provider: PropTypes.string,
  talkType: PropTypes.oneOf(Object.values(TALK_TYPES)).isRequired,
  talkName: PropTypes.string.isRequired,
  talkSchedule: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
  cospeaker: PropTypes.shape({
    photo: PropTypes.string,
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
};

TalkPreviewCard.defaultProps = {
  cospeaker: null,
  provider: null,
};
