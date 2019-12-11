import React, { forwardRef } from "react";
import styled from "styled-components";
import Tooltip from "@jonny/tooltip";
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import getTimezoneOffset from "get-timezone-offset";
import StravaIcon from "./strava-brands.svg";
import treadmill from "./treadmill.svg";
import bandaid from "./band-aid-solid.svg";
import thermometer from "./thermometer.svg";
import twitter from "./twitter-brands.svg";
import youtube from "./youtube-brands.svg";
import drink from "./glass-solid.svg";
import infoCircle from "./info-circle-regular.svg";
// import {LOS_ANGELES, LONDON, SOFIA, LISBOA} from './timezones';
import getFlag from "./get-flag";
import { useMedia } from "react-use-media";
import Countdown from "react-countdown-now";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  font-family: "Roboto Condensed";
  text-align: left;
  padding-left: 30px;
  padding-right: 30px;
  border-bottom: 1px solid black;
  align-items: center;
  height: 36px;
  @media screen and (max-width: 800px) {
    display: block;
    padding-top: 20px;
    height: auto;
  }
`;

const Day = styled.div`
  flex: 1;
  @media screen and (max-width: 800px) {
    display: inline-block;
  }
`;

const Time = styled.div`
  flex: 1;
  @media screen and (max-width: 800px) {
    display: block;
    font-size: 1.8em;
    margin-right: 15px;
    &:before {
      content: "Day ";
    }
  }
`;

const DateColumn = styled.div`
  flex: 2;
  @media screen and (max-width: 800px) {
    display: inline-block;
    margin-right: 15px;
    &:before {
      content: "Date: ";
    }
  }
`;

const Distance = styled.div`
  flex: 1;
  @media screen and (max-width: 800px) {
    display: inline-block;
    margin-right: 15px;
    &:before {
      content: "Distance: ";
    }
  }
`;

const City = styled.div`
  flex: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media screen and (max-width: 800px) {
    margin-right: 15px;
    &:before {
      content: "Location: ";
    }
  }
`;
const StravaLink = styled.div`
  flex: 1;
  @media screen and (max-width: 800px) {
    display: inline-block;
    margin-right: 15px;
  }
`;

const Treadmill = styled.div`
  width: 30px;
  justify-content: center;
  align-items: center;
`;

const Injury = styled.div`
  width: 30px;
  @media screen and (max-width: 800px) {
    display: inline-block;
  }
`;

const Drunk = styled.div`
  width: 30px;
  @media screen and (max-width: 800px) {
    display: inline-block;
  }
`;

const Camera = styled.div`
  width: 30px;
  @media screen and (max-width: 800px) {
    display: inline-block;
  }
`;

const TreadmillIcon = forwardRef((props, ref) => (
  <img
    style={{ width: 24, height: 24, marginTop: 8 }}
    src={treadmill}
    alt="Treadmill"
    ref={ref}
    {...props}
  />
));

const InjuryIcon = forwardRef((props, ref) => (
  <img
    style={{ width: 20, height: 20, marginTop: 6 }}
    src={bandaid}
    alt="Injury"
    ref={ref}
    {...props}
  />
));

const SickIcon = forwardRef((props, ref) => (
  <img
    style={{ width: 20, height: 20, marginTop: 6 }}
    src={thermometer}
    alt="Sick"
    ref={ref}
    {...props}
  />
));

const DrunkIcon = forwardRef((props, ref) => (
  <img
    style={{ width: 16, height: 16, marginTop: 6 }}
    src={drink}
    alt="Drunk"
    ref={ref}
    {...props}
  />
));

const CameraIcon = forwardRef((props, ref) => (
  <img
    style={{ width: 16, height: 16, marginTop: 6 }}
    src={twitter}
    alt="Post"
    ref={ref}
    {...props}
  />
));

const YouTube = forwardRef((props, ref) => (
  <img
    style={{ width: 16, height: 16, marginTop: 6 }}
    src={youtube}
    alt="YouTube"
    ref={ref}
    {...props}
  />
));

export const Header = () => {
  const isMobile = useMedia("(max-width: 800px)");
  if (isMobile) {
    return null;
  }
  return (
    <div>
      <Row style={{ background: "white", flex: 0 }}>
        <Time>Day</Time>
        <DateColumn>Date</DateColumn>
        <Day>Time</Day>
        <Distance>Distance</Distance>
        <City>City</City>
        <StravaLink>Run</StravaLink>
        <Treadmill>
          <Tooltip
            preferredPlacement="bottom"
            tip="Treadmill"
            style={{
              fontFamily: "Arial, Helvetica"
            }}
          >
            <TreadmillIcon />
          </Tooltip>
        </Treadmill>
        <Injury>
          <Tooltip
            preferredPlacement="bottom"
            tip="Injury"
            style={{
              fontFamily: "Arial, Helvetica"
            }}
          >
            <InjuryIcon />
          </Tooltip>
        </Injury>
        <Injury>
          <Tooltip
            preferredPlacement="bottom"
            tip="Sickness"
            style={{
              fontFamily: "Arial, Helvetica"
            }}
          >
            <SickIcon />
          </Tooltip>
        </Injury>
        <Drunk>
          <Tooltip
            preferredPlacement="bottom"
            tip="Drunk"
            style={{
              fontFamily: "Arial, Helvetica"
            }}
          >
            <DrunkIcon />
          </Tooltip>
        </Drunk>
        <Camera>
          <Tooltip
            preferredPlacement="bottom"
            tip="Video"
            style={{
              fontFamily: "Arial, Helvetica"
            }}
          >
            <CameraIcon />
          </Tooltip>
        </Camera>
      </Row>
    </div>
  );
};

const getTime = run => {
  return new Date(
    new Date(run.date).getTime() +
      getTimezoneOffset("Europe/Zurich", new Date(run.date)) * 1000 * 60
  );
};

class TimeRemaining extends React.Component {
  render() {
    const dayAfter = addDays(new Date("2016-02-18"), this.props.day + 2);
    const date = Date.UTC(
      dayAfter.getFullYear(),
      dayAfter.getUTCMonth(),
      dayAfter.getUTCDate(),
      2 + getTimezoneOffset("Europe/Zurich") / 60
    );
    return (
      <span>
        <Countdown
          date={date}
          renderer={({ hours, minutes, seconds }) => (
            <span>
              {hours}:{pad(minutes)}:{pad(seconds)}
            </span>
          )}
        />{" "}
        hours left to to do so
      </span>
    );
  }
}

const pad = num => {
  if (num < 10) return `0${num}`;
  return num;
};

const YetToRunRow = styled(Row)`
  @media screen and (max-width: 800px) {
    padding-bottom: 15px;
  }
`;

class SingleRun extends React.Component {
  render() {
    const time = this.props.run.date ? getTime(this.props.run) : null;
    if (this.props.isToday && !this.props.run.distance) {
      return (
        <YetToRunRow>
          <Time>{this.props.run.day}</Time>
          <div style={{ flex: 7, color: "gray" }}>
            Did not yet run today... <TimeRemaining day={this.props.run.day} />
          </div>
          <div style={{ width: 120 }} />
        </YetToRunRow>
      );
    }
    const countries = this.props.run.country
      ? this.props.run.country.split(",")
      : [];
    return (
      <Row>
        <Time>{this.props.run.day}</Time>
        <DateColumn>
          {format(
            new Date(addDays(new Date("2016-02-18"), this.props.run.day)),
            "dd.MM.YYY"
          )}
        </DateColumn>
        <Day>
          {this.props.run.date
            ? format(time, "h:mmaaaa").replace(/\./g, "")
            : null}
          {this.props.run.date &&
          time.getHours() >= 0 &&
          time.getHours() < 2 ? (
            <Tooltip
              preferredPlacement="top"
              tip={
                <div style={{ width: 150 }}>
                  <strong>Run after midnight</strong>
                  <br /> According to my rules every day starts and ends at 2am.
                </div>
              }
              style={{
                fontFamily: "Arial, Helvetica"
              }}
            >
              <img
                src={infoCircle}
                alt="Info Tooltip"
                style={{ height: 14, width: 14, marginLeft: 6 }}
              />
            </Tooltip>
          ) : null}
        </Day>
        <br />
        <Distance>
          {this.props.run.distance
            ? (this.props.run.distance / 1000).toFixed(1) + "km"
            : "?"}
        </Distance>
        <City>
          {this.props.run.city ? (
            <>
              <div style={{ display: "flex" }}>
                {countries.map(c => (
                  <Tooltip
                    key={c}
                    preferredPlacement="left"
                    tip={c}
                    style={{
                      fontFamily: "Arial, Helvetica"
                    }}
                  >
                    <img
                      src={getFlag(c)}
                      style={{ height: 20, marginRight: 5 }}
                      alt={c}
                    />
                  </Tooltip>
                ))}
              </div>
              {this.props.run.city}
            </>
          ) : null}
        </City>
        <StravaLink>
          {this.props.run.strava_id ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://strava.com/activities/${this.props.run.strava_id}`}
            >
              <Tooltip
                tip="See Run on Strava"
                preferredPlacement="top"
                style={{
                  fontFamily: "Arial, Helvetica"
                }}
              >
                <img
                  style={{
                    height: 24,
                    width: 24,
                    marginTop: 3
                  }}
                  src={StravaIcon}
                  alt="Strava activity"
                />
              </Tooltip>
            </a>
          ) : null}
        </StravaLink>
        <Treadmill>
          {this.props.run.treadmill ? (
            <Tooltip
              preferredPlacement="top"
              style={{
                fontFamily: "Arial, Helvetica"
              }}
              tip={
                <div style={{ whiteSpace: "nowrap" }}>
                  {this.props.run.treadmill}
                </div>
              }
            >
              <TreadmillIcon />
            </Tooltip>
          ) : null}
        </Treadmill>
        <Injury>
          {this.props.run.injured ? (
            <Tooltip
              preferredPlacement="top"
              style={{
                fontFamily: "Arial, Helvetica"
              }}
              tip={
                <div style={{ width: 200 }}>
                  <strong>Injury:</strong>
                  <br />
                  {this.props.run.injured}
                </div>
              }
            >
              <InjuryIcon />
            </Tooltip>
          ) : null}
        </Injury>
        <Injury>
          {this.props.run.sick ? (
            <Tooltip
              preferredPlacement="top"
              style={{
                fontFamily: "Arial, Helvetica"
              }}
              tip={
                <div style={{ width: 200 }}>
                  <strong>Sickness:</strong>
                  <br />"{this.props.run.sick}"
                </div>
              }
            >
              <SickIcon />
            </Tooltip>
          ) : null}
        </Injury>
        <Drunk>
          {this.props.run.drunk ? (
            <Tooltip
              preferredPlacement="top"
              style={{
                fontFamily: "Arial, Helvetica"
              }}
              tip={
                <div style={{ width: 200, fontWeight: "normal" }}>
                  <strong>Alcohol Intake:</strong>
                  <br />"{this.props.run.drunk}"
                </div>
              }
            >
              <DrunkIcon />
            </Tooltip>
          ) : null}
        </Drunk>
        <Camera>
          {this.props.run.social_media_link ? (
            <Tooltip
              preferredPlacement="top"
              style={{
                fontFamily: "Arial, Helvetica"
              }}
              tip={
                <div
                  style={{
                    width: 100,
                    fontWeight: "normal",
                    textAlign: "center"
                  }}
                >
                  Video
                </div>
              }
            >
              <a
                href={this.props.run.social_media_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {this.props.run.social_media_link.includes("youtube.com") ? (
                  <YouTube />
                ) : this.props.run.social_media_link.includes("twitter.com") ? (
                  <CameraIcon />
                ) : null}
              </a>
            </Tooltip>
          ) : null}
        </Camera>
      </Row>
    );
  }
}
export default SingleRun;
