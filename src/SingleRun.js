import React, { forwardRef } from "react";
import styled from "styled-components";
import { mix } from "polished";
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

const Weather = styled.div`
  flex: 1.5;
  @media screen and (max-width: 800px) {
    display: inline-block;
    margin-right: 15px;
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
        <Weather>Weather</Weather>
        <StravaLink>Run</StravaLink>
        <Treadmill>
          <Tooltip
            preferredPlacement="bottom"
            tip="Treadmill"
            style={{
              fontFamily: "Arial, Helvetica",
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
              fontFamily: "Arial, Helvetica",
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
              fontFamily: "Arial, Helvetica",
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
              fontFamily: "Arial, Helvetica",
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
              fontFamily: "Arial, Helvetica",
            }}
          >
            <CameraIcon />
          </Tooltip>
        </Camera>
      </Row>
    </div>
  );
};

const getTime = (run) => {
  return new Date(
    new Date(run.date).getTime() +
      getTimezoneOffset("Europe/Zurich", new Date(run.date)) * 1000 * 60
  );
};

const renderConditionEmoji = (condition) => {
  if (condition === "day-sunny") {
    return "☀️";
  }
  if (condition === "day-cloudy") {
    return "⛅️";
  }
  if (condition === "cloudy") {
    return "☁️";
  }
  if (condition === "fog") {
    return "🌫";
  }
  if (condition === "rain") {
    return "🌦";
  }
  if (condition === "sleet") {
    return "🌨";
  }
  if (condition === "snow") {
    return "❄️";
  }
  if (condition === "rain-wind") {
    return "💧💨";
  }
  if (condition === "showers") {
    return "🌧";
  }
  if (condition === "snow-wind") {
    return "❄️💨";
  }
  if (condition === "lighting") {
    return "🌩";
  }
  if (condition === "hail") {
    return "🧊";
  }
  if (condition === "thunderstorm") {
    return "⛈";
  }
  if (condition === "strong-wind") {
    return "🌪";
  }
  return "";
};

const renderCondition = (condition) => {
  if (condition === "day-sunny") {
    return "Sunny";
  }
  if (condition === "day-cloudy") {
    return "Cloudy";
  }
  if (condition === "cloudy") {
    return "Cloudy";
  }
  if (condition === "fog") {
    return "Foggy";
  }
  if (condition === "rain") {
    return "Rainy";
  }
  if (condition === "sleet") {
    return "Snowrain";
  }
  if (condition === "snow") {
    return "Snow";
  }
  if (condition === "rain-wind") {
    return "Rain wind";
  }
  if (condition === "showers") {
    return "Showers";
  }
  if (condition === "snow-wind") {
    return "Snow wind";
  }
  if (condition === "lighting") {
    return "Lightning";
  }
  if (condition === "hail") {
    return "Hail";
  }
  if (condition === "thunderstorm") {
    return "Thunderstorm";
  }
  if (condition === "strong-wind") {
    return "Very windy";
  }
  return "Unknown";
};

const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
};

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

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

const pad = (num) => {
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
                fontFamily: "Arial, Helvetica",
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
          {this.props.run.day === 1763 ? <div>In my room</div> : null}
          {this.props.run.city ? (
            <>
              <div style={{ display: "flex" }}>
                {countries.map((c) => (
                  <Tooltip
                    key={c}
                    preferredPlacement="left"
                    tip={c}
                    style={{
                      fontFamily: "Arial, Helvetica",
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

        <Weather>
          {this.props.run.weather ? (
            <Tooltip
              preferredPlacement="top"
              tip={
                <div style={{ fontWeight: 300 }}>
                  Condition:{" "}
                  {renderConditionEmoji(this.props.run.weather.condition)}{" "}
                  {renderCondition(this.props.run.weather.condition)} <br />
                  Pressure: {this.props.run.weather.pressure} hPa <br />{" "}
                  Windspeed: {this.props.run.weather.windspeed} km/h <br />
                  {this.props.run.weather.station_location ? (
                    <span>
                      (Measured at{" "}
                      {format(
                        new Date(
                          new Date(this.props.run.weather.time).getTime() +
                            getTimezoneOffset(
                              "Europe/Zurich",
                              new Date(this.props.run.weather.time)
                            ) *
                              1000 *
                              60
                        ),
                        "dd.MM.yyyy HH:mm"
                      )}{" "}
                      at a station which <br /> was{" "}
                      {getDistanceFromLatLonInKm(
                        this.props.run.weather.station_location[0],
                        this.props.run.weather.station_location[1],
                        this.props.run.location[0],
                        this.props.run.location[1]
                      ).toFixed(1)}
                      km away from the run start distance)
                    </span>
                  ) : null}
                </div>
              }
            >
              <span
                style={{
                  color: mix(
                    Math.min(1, (this.props.run.weather.temperature + 5) / 35),
                    "#e74c3c",
                    "#3498db"
                  ),
                }}
              >
                {renderConditionEmoji(this.props.run.weather.condition)}{" "}
                {this.props.run.weather.temperature.toFixed(1)}°C
              </span>
            </Tooltip>
          ) : null}
        </Weather>
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
                  fontFamily: "Arial, Helvetica",
                }}
              >
                <img
                  style={{
                    height: 24,
                    width: 24,
                    marginTop: 3,
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
                fontFamily: "Arial, Helvetica",
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
                fontFamily: "Arial, Helvetica",
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
                fontFamily: "Arial, Helvetica",
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
                fontFamily: "Arial, Helvetica",
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
                fontFamily: "Arial, Helvetica",
              }}
              tip={
                <div
                  style={{
                    width: 100,
                    fontWeight: "normal",
                    textAlign: "center",
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
