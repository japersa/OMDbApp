import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import styled from 'styled-components/native';
import {connect} from 'react-redux';

const MovieSearch = ({movies, reduxSearchMovie}: any) => {
  const [inputSearchValue, setInputSearchValue] = useState('');

  const [moviesListSuggestions, setMoviesListSuggestions] = useState<
    any[] | null
  >(null);

  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);

  useEffect(() => {
    setMoviesListSuggestions(movies);
  }, [movies]);

  const onChangeInputSearch = (text: any) => {
    reduxSearchMovie(text);
    setInputSearchValue(text);
  };

  const onSelectedMovie = (movie: any) => {
    setSelectedMovie(movie);
    setInputSearchValue('');
    setMoviesListSuggestions(null);
  };

  const movieSuggestions = moviesListSuggestions?.map((ele, key) => (
    <MovieSuggestion
      key={key}
      onPress={() => {
        onSelectedMovie(ele);
      }}>
      <MovieSuggestionText>{ele.Title}</MovieSuggestionText>
    </MovieSuggestion>
  ));

  const showSelectedMovie =
    selectedMovie != null ? (
      <SelectedMovie>
        <Poster source={{uri: selectedMovie.Poster}} resizeMode="contain" />
        <SelectedMovieText>
          {selectedMovie.Title} ({selectedMovie.Year})
        </SelectedMovieText>
      </SelectedMovie>
    ) : (
      <SelectedMovieEmpty>
        <SelectedMovieEmptyText>
          Enter a title of a movie
        </SelectedMovieEmptyText>
      </SelectedMovieEmpty>
    );

  return (
    <Container>
      <SafeAreaView />
      <Title>Search movie</Title>
      <Input
        placeholder="Title of a movie"
        placeholderTextColor="#3f3f3f"
        onChangeText={onChangeInputSearch}
        value={inputSearchValue}
      />
      {movieSuggestions}
      {showSelectedMovie}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-start: 10px;
  padding-end: 10px;
`;

const Title = styled.Text`
  padding-bottom: 10px;
  color: #3f3f3f;
`;

const MovieSuggestion = styled.TouchableOpacity`
  background-color: #f8f8fc;
  border-width: 0.5px;
  border-color: #bebebe;
  color: #3f3f3f;
  padding: 5px 5px 10px 10px;
`;

const MovieSuggestionText = styled.Text`
  font-size: 16px;
  color: #3f3f3f;
`;

const Input = styled.TextInput`
  height: 44px;
  color: #3f3f3f;
  background-color: #ededed;
  padding-start: 10px;
  padding-end: 10px;
`;

const Poster = styled.Image`
  height: 400px;
  width: 400px;
`;

const SelectedMovie = styled.View`
  flex: 1;
  margin: 16px;
  align-items: center;
`;

const SelectedMovieEmpty = styled.View`
  flex: 1;
  margin: 16px;
  align-items: center;
`;

const SelectedMovieText = styled.Text`
  margin-top: 10px;
  font-size: 16px;
  color: #3f3f3f;
  font-weight: bold;
`;

const SelectedMovieEmptyText = styled.Text`
  margin-top: 10px;
  font-size: 16px;
  color: #3f3f3f;
  font-weight: bold;
`;

const mapStateToProps = (state: any) => {
  return {
    movies: state.movie.movies,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    reduxSearchMovie: (search: any) =>
      dispatch({
        type: 'SEARCH_MOVIE',
        value: search,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MovieSearch);
